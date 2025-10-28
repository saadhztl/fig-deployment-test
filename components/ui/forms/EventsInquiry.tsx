'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Container } from '@/components/primitives/Container';
import { IForm, IFields } from '@/lib/generated';
import { Input } from './form-elements/Input';
import { Select } from './form-elements/Select';
import { DatePicker } from './form-elements/DatePicker';
import { ReCaptcha } from './form-elements/ReCaptcha';
import { useReCaptcha } from '@/lib/hooks/useReCaptcha';
import { cn } from '@/utils/cn';
import { generateYupSchema } from '@/utils/yup-schema-generator';
import { TextArea } from './form-elements/TextArea';
import { dataLayerInstance } from '@/utils/gtm-utils';

export const EventsInquiry = ({ form_name, fields, action, method, enable_recaptcha }: IForm) => {
  const [eventStartTime, setEventStartTime] = useState<string>('');
  const [eventEndTime, setEventEndTime] = useState<string>('');
  const [endTimeOptions, setEndTimeOptions] = useState<Array<{ text: string; value: string }>>([]);

  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: fields ? yupResolver(generateYupSchema(fields)) : undefined,
  });

  const {
    recaptchaRef,
    siteKey,
    recaptchaError,
    handleRecaptchaChange,
    validateRecaptchaForSubmission,
    getRecaptchaValue,
  } = useReCaptcha();

  // Helper function to parse time string to minutes since midnight
  const timeToMinutes = (timeStr: string): number => {
    // Handle formats like "08:00 AM", "08:00 am", "8:00 AM", etc.
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/i);
    if (!match) return 0;

    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const period = match[3].toUpperCase();

    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  };

  // Get all time options from CMS
  const getAllTimeOptions = () => {
    const startTimeField = fields?.find((field) => field.dropdown?.name === 'start_time');
    return startTimeField?.dropdown?.options_group || [];
  };

  // Handle start time change
  const handleStartTimeChange = (selectedTime: string) => {
    setEventStartTime(selectedTime);

    if (!selectedTime) {
      // If no start time selected, reset end time
      setEventEndTime('');
      setEndTimeOptions([]);
      setValue('end_time', '');
      return;
    }

    const allTimeOptions = getAllTimeOptions();
    const startMinutes = timeToMinutes(selectedTime);
    const targetEndMinutes = startMinutes + 180; // 3 hours later
    const minEndMinutes = startMinutes + 60; // Minimum 1 hour later

    // Filter options to show only times after start time + 1 hour
    const filteredOptions = allTimeOptions
      .filter((option) => {
        const optionMinutes = timeToMinutes(option.text || option.value);
        return optionMinutes >= minEndMinutes;
      })
      .map((option) => ({
        text: option.text || option.value,
        value: option.value,
      }));

    setEndTimeOptions(filteredOptions);

    // Find the time that matches 3 hours later
    let autoSelectedTime = '';
    const exactMatch = filteredOptions.find((option) => {
      const optionMinutes = timeToMinutes(option.text || option.value);
      return optionMinutes === targetEndMinutes;
    });

    if (exactMatch) {
      // If exact 3-hour match exists, use it
      autoSelectedTime = exactMatch.value;
    } else if (filteredOptions.length > 0) {
      // If no exact match, find the closest time >= 3 hours or use the last available time
      const closestMatch = filteredOptions.find((option) => {
        const optionMinutes = timeToMinutes(option.text || option.value);
        return optionMinutes >= targetEndMinutes;
      });

      autoSelectedTime = closestMatch
        ? closestMatch.value
        : filteredOptions[filteredOptions.length - 1].value;
    }

    // Set the end time
    setEventEndTime(autoSelectedTime);
    setValue('end_time', autoSelectedTime);
  };

  const handleFormSubmit = async (data: Record<string, string>) => {
    // Validate reCAPTCHA if enabled
    const isRecaptchaValid = validateRecaptchaForSubmission(enable_recaptcha);
    if (!isRecaptchaValid) {
      return; // Stop submission if reCAPTCHA validation fails
    }

    try {
      // Get location_id and franchise_id from URL query parameters
      const urlParams = new URLSearchParams(window.location.search);
      const locationId = urlParams.get('location_id') || '';
      const franchiseId = urlParams.get('franchise') || '';

      // Build the payload object
      const payload: Record<string, string> = {
        ...data,
        locationId,
        franchiseId,
      };

      // Add current date as field_293 (format: MM-DD-YYYY)
      const currentDate = new Date();
      const formattedCurrentDate = `${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(
        currentDate.getDate()
      ).padStart(2, '0')}-${currentDate.getFullYear()}`;
      payload.field_293 = formattedCurrentDate;

      // Add reCAPTCHA response if enabled
      if (enable_recaptcha) {
        const recaptchaToken = getRecaptchaValue();
        if (recaptchaToken) {
          payload['g-recaptcha-response'] = recaptchaToken;
        } else {
          console.error('reCAPTCHA is enabled but no token found');
        }
      }

      // Use the event-enquiry API endpoint
      const apiEndpoint = '/api/event-enquiry';

      // Submit the POST request with JSON payload
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        dataLayerInstance.trackFormSubmission('event_conversions', payload);
        const jsonResponse = await response.json();

        // Check for redirect URL in response
        if (jsonResponse.redirect_url) {
          window.location.href = jsonResponse.redirect_url;
        } else {
          // Reset form and show success message
          reset();
          alert(jsonResponse.message || 'Event enquiry submitted successfully!');
        }
      } else {
        // Handle HTTP error
        const errorResponse = await response.json().catch(() => ({}));
        console.error('Form submission failed:', response.statusText, errorResponse);
        alert(
          errorResponse.message || 'There was an error submitting your enquiry. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(
        'There was an error submitting your enquiry. Please check your connection and try again.'
      );
    }
  };

  const renderEventDropDowns = (
    index: number,
    fieldName: string,
    optionsGroup: Array<{ value: string; text?: string }>,
    isRequired: boolean,
    field: IFields
  ) => {
    return (
      <React.Fragment key={`event-times-${index}`}>
        {/* Start time */}
        <Select
          {...register(fieldName)}
          options={optionsGroup.map((option) => ({
            label: option.text || '',
            value: option.value,
          }))}
          className="w-full py-[15px] px-[16px] border-1 border-[#bff300] rounded-[6px] text-[16px] text-white bg-transparent outline-none focus:border-white [&>option]:bg-black [&>option:checked]:text-white [&>option]:text-[16px] [&>option:disabled]:text-[#6B7280] placeholder:text-[16px] placeholder:font-[400]"
          wrapperClassName="col-span-12 tablet:col-span-6"
          labelClassName="block text-[16px] text-white font-[300] mb-[8px]"
          error={errors[fieldName]?.message ? String(errors[fieldName]?.message) : undefined}
          id={fieldName}
          required={isRequired}
          label={field.dropdown.label}
          placeholder={field.dropdown.placeholder_text}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setValue(fieldName, selectedValue);
            handleStartTimeChange(selectedValue);
          }}
        />

        {/* End time */}
        <Select
          {...register('end_time')}
          value={eventEndTime}
          options={endTimeOptions.map((option) => ({
            label: option.text || '',
            value: option.value,
          }))}
          className="w-full py-[15px] px-[16px] border-1 border-[#bff300] rounded-[6px] text-[16px] text-white bg-transparent outline-none focus:border-white [&>option]:bg-black [&>option:checked]:text-white [&>option]:text-[16px] [&>option:disabled]:text-[#6B7280] disabled:opacity-50 placeholder:text-[16px] placeholder:font-[400]"
          wrapperClassName="col-span-12 tablet:col-span-6"
          labelClassName="block text-[16px] text-white font-[300] mb-[8px]"
          error={errors['end_time']?.message ? String(errors['end_time']?.message) : undefined}
          id="end_time"
          required={isRequired}
          label="Event End Time"
          placeholder="Select End Time"
          name="end_time"
          disabled={!eventStartTime}
          onChange={(e) => {
            const selectedValue = e.target.value;
            setEventEndTime(selectedValue);
            setValue('end_time', selectedValue);
          }}
        />
      </React.Fragment>
    );
  };

  return (
    <Container componentName="EventsInquiryForm">
      <form
        name={form_name}
        method={method as string}
        action={action?.href}
        onSubmit={handleSubmit(handleFormSubmit)}
        className="grid grid-cols-12 gap-x-6 gap-y-8"
      >
        {/* Render Input Fields Dynamically */}

        {fields?.map((field, index) => {
          // Handle text area fields
          if (field?.text_area) {
            const textAreaName = field.text_area.name;
            return (
              <TextArea
                key={index}
                {...register(textAreaName)}
                placeholder={field.text_area.palceholder_text || ''}
                label={field.text_area.label}
                required={field.text_area.required}
                maxLength={field.text_area.max_length || undefined}
                id={textAreaName}
                className="w-full py-[10px] px-[16px] border-1 border-[#bff300] rounded-[6px] text-white font-[500] bg-transparent placeholder:text-[#6B7280] placeholder:text-[16px] placeholder:font-[400]  outline-none focus:border-white resize-y min-h-[80px]"
                wrapperClassName="col-span-12"
                labelClassName="block text-[16px] text-white font-[300] mb-[8px]"
                error={
                  errors[textAreaName]?.message ? String(errors[textAreaName]?.message) : undefined
                }
              />
            );
          }

          // Handle input fields
          if (field?.input) {
            const fieldName = field.input.name;
            const inputType = field.input.input_type;
            const isRequired = field.input.required;

            // Handle date input type with DatePicker
            if (inputType === 'date') {
              return (
                <Controller
                  key={index}
                  name={fieldName}
                  control={control}
                  render={({ field: controllerField }) => (
                    <DatePicker
                      {...controllerField}
                      id={fieldName}
                      label={field.input.label}
                      placeholder={field.input.placeholder_text || 'Select Date'}
                      wrapperClassName="col-span-12 tablet:col-span-6"
                      labelClassName="block text-[16px] text-white font-[300] mb-[8px]"
                      error={
                        errors[fieldName]?.message ? String(errors[fieldName]?.message) : undefined
                      }
                      required={isRequired}
                      minDate={new Date()} //Today
                      maxDate={new Date(new Date().getFullYear(), 11, 31)} //End of the year
                      onChange={(date, dateString) => {
                        controllerField.onChange(dateString);
                      }}
                    />
                  )}
                />
              );
            }

            // Handle regular input types
            return (
              <Input
                key={index}
                {...register(fieldName)}
                type={inputType === 'email' ? 'email' : inputType === 'tel' ? 'tel' : 'text'}
                placeholder={field.input.placeholder_text || ''}
                className="w-full py-[15px] px-[16px] border-1 border-[#bff300] rounded-[6px] text-white font-[500] bg-transparent placeholder:text-[#6B7280] placeholder:text-[16px] placeholder:font-[400] outline-none focus:border-white"
                wrapperClassName="col-span-12 tablet:col-span-6"
                labelClassName="block text-[16px] text-white font-[300] mb-[8px]"
                error={errors[fieldName]?.message ? String(errors[fieldName]?.message) : undefined}
                id={fieldName}
                required={isRequired}
                label={field.input.label}
              />
            );
          }

          // Handle dropdown fields
          if (field?.dropdown) {
            const fieldName = field.dropdown.name;
            const isRequired = field.dropdown.required;
            const optionsGroup = field.dropdown.options_group || [];

            if (field?.dropdown?.name === 'start_time') {
              return renderEventDropDowns(index, fieldName, optionsGroup, isRequired, field);
            }

            return (
              <Select
                key={index}
                {...register(fieldName)}
                options={optionsGroup.map((option) => ({
                  label: option.text || '',
                  value: option.value,
                }))}
                className="w-full py-[15px] px-[16px] border-1 border-[#bff300] rounded-[6px] text-[16px] text-white bg-transparent outline-none focus:border-white [&>option]:bg-[#1c1c1c] [&>option:checked]:text-white [&>option]:text-[16px]  [&>option:disabled]:text-[#6B7280]"
                wrapperClassName="col-span-12 tablet:col-span-6"
                labelClassName="block text-[16px] text-white font-[300] mb-[8px]"
                error={errors[fieldName]?.message ? String(errors[fieldName]?.message) : undefined}
                id={fieldName}
                required={isRequired}
                label={field.dropdown.label}
                placeholder={field.dropdown.placeholder_text}
              />
            );
          }

          return null;
        })}

        {/* Submit Section */}
        <div className="col-span-12 flex flex-col mt-[40px] items-center">
          {/* reCAPTCHA */}
          {enable_recaptcha && siteKey && (
            <ReCaptcha
              ref={recaptchaRef}
              siteKey={siteKey}
              onChange={handleRecaptchaChange}
              onError={() => {
                console.log('Error in recaptcha');
                handleRecaptchaChange(null);
              }}
              onExpired={() => {
                console.log('reCAPTCHA expired');
                handleRecaptchaChange(null);
              }}
              error={recaptchaError}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={cn(
              'py-[10px] px-[50px] bg-white text-black rounded-[8px] font-[600] text-[18px] uppercase',
              'cursor-pointer border-none outline-none'
            )}
          >
            {fields?.find((field) => field.submit)?.submit.redirect_link?.title}
          </button>
        </div>
      </form>
    </Container>
  );
};
