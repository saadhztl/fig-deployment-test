'use client';
import { IForm } from '@/lib/generated';
import { generateYupSchema } from '@/utils/yup-schema-generator';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldRenderer } from './form-elements/FormFieldRenderer';
import { Container } from '@/components/primitives/Container';
import { cn } from '@/utils/cn';
import { dataLayerInstance } from '@/utils/gtm-utils';

export const Contactus = ({ form_name, fields, action, method, enable_recaptcha }: IForm) => {
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
      // Add static fields based on the sample data structure
      queryParams.append('u', '32');
      queryParams.append('f', '32');
      queryParams.append('s', '');
      queryParams.append('c', '0');
      queryParams.append('m', '0');
      queryParams.append('act', 'sub');
      queryParams.append('v', '2');
      queryParams.append('or', '8060bf5bce08980a4fedf6cc0d4f1f53');
      queryParams.append('jsonp', 'true');

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

        if (fieldConfig?.locations?.name === key) {
          queryParams.append('field[152]', stringValue);
        } else if (fieldConfig?.input?.name === 'message') {
          queryParams.append('field[120]', stringValue);
        } else if (fieldConfig?.input?.name === key) {
          queryParams.append(key, stringValue);
        } else {
          console.log(`Unknown field: ${key} = ${stringValue}`);
        }
      });

      // Build the complete URL with query parameters
      const actionUrl = new URL(action?.href || '');
      actionUrl.search = queryParams.toString();

      // Submit the GET request
      const response = await fetch(actionUrl.toString(), {
        method: 'GET',
      });

      if (response.ok) {
        dataLayerInstance.trackFormSubmission('contact_us', data);
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
    <Container componentName="ContactusForm">
      <form
        name={form_name}
        method={method as string}
        action={action?.href}
        className="grid grid-cols-12 gap-y-11 gap-x-6"
      >
        <FormFieldRenderer
          fields={fields || []}
          register={register}
          errors={errors}
          fieldClassNames={{
            input: {
              wrapper: cn('col-span-12 tablet:col-span-6', '[&[id="message"]]:col-span-12'),
              element:
                'w-full py-[12px] px-[10px] border-2 border-[#BFF300] rounded-md text-white text-[16px] bg-transparent placeholder:text-[#b5b5b5] outline-none focus:border-[#6BA71E]',
            },
            locations: {
              wrapper: 'col-span-12 tablet:col-span-6',
              element:
                'w-full py-[12px] px-[10px] border-2 border-[#BFF300] rounded-md text-white text-[16px] bg-transparent outline-none [&>option]:bg-white [&>option]:text-black ',
            },
            submit: {
              wrapper: cn('col-span-12 flex flex-col gap-4 items-start'),
              element: cn(
                'py-[6px] px-[48px] bg-white text-black rounded-md font-semibold text-[18px] uppercase tracking-wider',
                'hover:bg-black hover:text-white hover:border-white border-2 transition-colors duration-200 cursor-pointer'
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
