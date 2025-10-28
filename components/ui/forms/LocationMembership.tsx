'use client';
import { IForm } from '@/lib/generated';
import { generateYupSchema } from '@/utils/yup-schema-generator';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldRenderer } from './form-elements/FormFieldRenderer';
import { Container } from '@/components/primitives/Container';
import { cn } from '@/utils/cn';
import { IExtendedProps } from '@/lib/types';
import { dataLayerInstance } from '@/utils/gtm-utils';

export const LocationMembership = ({
  form_name,
  fields,
  action,
  method,
  enable_recaptcha,
  extendedProps,
}: IForm & IExtendedProps) => {
  const schema = fields && generateYupSchema(fields);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: schema ? yupResolver(schema) : undefined });

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!action?.href) {
      console.error('No action URL found');
      return;
    }

    // Note: reCAPTCHA validation is already handled by FormFieldRenderer

    try {
      // Build query parameters for GET request
      const queryParams = new URLSearchParams();
      const location = `${extendedProps?.location_city} - ${extendedProps?.location_neighbourhood}`;
      // Add static fields based on the sample data structure
      queryParams.append('u', '29');
      queryParams.append('f', '29');
      queryParams.append('s', '');
      queryParams.append('c', '0');
      queryParams.append('m', '0');
      queryParams.append('act', 'sub');
      queryParams.append('v', '2');
      queryParams.append('or', '5b58a8a573f5d5bbca5ad4db9691be1e');
      queryParams.append('jsonp', 'true');

      queryParams.append('field[152]', location);

      // Get user's IP address
      let userIP = '';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        userIP = ipData.ip;
      } catch (error) {
        console.error('Could not fetch IP address:', error);
        userIP = ''; // fallback to empty string
      }

      // Get user's User-Agent
      const userAgent = navigator.userAgent || '';

      // Add IP address and User-Agent fields
      queryParams.append('field[157]', userIP);
      queryParams.append('field[158]', userAgent);

      // Add reCAPTCHA response if enabled and available
      if (enable_recaptcha) {
        const recaptchaToken = data._recaptchaToken as string;
        if (recaptchaToken) {
          queryParams.append('g-recaptcha-response', recaptchaToken);
        } else {
          console.error('reCAPTCHA is enabled but no token found in data');
        }
      }

      // Map form fields to their expected names
      Object.entries(data).forEach(([key, value]) => {
        // Skip internal fields like _recaptchaToken
        if (key.startsWith('_')) {
          return;
        }

        const stringValue = String(value); // Convert unknown to string
        // Find the field configuration to get proper mapping
        const fieldConfig = fields?.find(
          (field) => field.input?.name === key || field.locations?.name === key
        );

        if (fieldConfig?.input?.name === key) {
          queryParams.append(key, stringValue);
        } else {
          console.error(`Unknown field: ${key} = ${stringValue}`);
        }
      });

      // Build the complete URL with query parameters
      const actionUrl = new URL(action.href);
      actionUrl.search = queryParams.toString();

      // Submit the GET request
      const response = await fetch(actionUrl.toString(), {
        method: 'GET',
      });

      if (response.ok) {
        dataLayerInstance.trackFormSubmission('founding_member', {
          ...data,
          location: extendedProps?.location_city,
        });
        // Get the response text which contains the redirect JavaScript
        const responseText = await response.text();

        // Parse the JavaScript response to extract the redirect URL
        // Handle both single and double quotes, and potential variations
        const urlMatch =
          responseText.match(/window\.top\.location\.href\s*=\s*["']([^"']+)["']/i) ||
          responseText.match(/location\.href\s*=\s*["']([^"']+)["']/i);

        if (urlMatch && urlMatch[1]) {
          const redirectUrl = urlMatch[1];

          try {
            // Validate the URL before redirecting
            new URL(redirectUrl); // This will throw if URL is invalid

            // Redirect the user to the confirmation page
            window.location.href = redirectUrl;
          } catch (urlError) {
            console.error('Invalid redirect URL:', redirectUrl, urlError);
            reset(); // Reset form if URL is invalid
          }
        } else {
          reset(); // Reset the form fields if no redirect
        }
      } else {
        console.error('Form submission failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Container componentName="LocationMembershipForm" edgeToEdge>
      <form
        name={form_name}
        method={method as string}
        action={action?.href}
        className="grid grid-cols-12 gap-2 tablet:gap-x-6"
      >
        <FormFieldRenderer
          fields={fields || []}
          register={register}
          errors={errors}
          fieldClassNames={{
            input: {
              wrapper: 'col-span-12 tablet:col-span-6',
              element:
                'w-full py-[14px] px-[10px] border-2 border-[#4d7400] rounded-md text-[20px] outline-none',
            },
            locations: {
              wrapper: 'col-span-12 tablet:col-span-6',
              element: 'w-full py-[14px] px-[10px]',
            },
            disclaimer: {
              wrapper: 'col-span-12',
              element: 'text-sm text-white text-[16px] leading-[20px]',
            },
            submit: {
              wrapper: cn('items-end pt-4', 'col-span-12'),
              element: cn(
                'max-w-fit tablet:mt-6 py-2 px-4 bg-light border-2 border-light rounded-md',
                'uppercase !leading-[normal] tracking-[2px] text-lg font-semibold text-green-dark',
                'hover:bg-[#33463300] hover:text-light'
              ),
            },
          }}
          enable_recaptcha={enable_recaptcha}
          onFormSubmit={handleSubmit}
          customOnSubmit={handleFormSubmit}
        />
      </form>
    </Container>
  );
};
