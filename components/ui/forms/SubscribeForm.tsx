'use client';
import { useForm } from 'react-hook-form';
import { IFooter, IForm } from '@/lib/generated';
import { RichText } from '@/components/primitives/RichText';
import { useGetEntriesByUids } from '@/lib/hooks/useEntryData';
import { FormFieldRenderer } from './form-elements/FormFieldRenderer';
import { cn } from '@/utils/cn';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchema } from '@/utils/yup-schema-generator';
import { getCSLPAttributes } from '@/lib/type-guards';
import { dataLayerInstance } from '@/utils/gtm-utils';

export const SubscribeForm = ({
  form_title,
  form_disclaimer,
  form_fields,
  $,
}: NonNullable<IFooter['subscribe_form']>) => {
  if (!form_fields || form_fields.length === 0) return <></>;

  const { data: formReferenceData } = useGetEntriesByUids<IForm>({ references: form_fields });

  const formData = formReferenceData?.[0]?.data as IForm;
  const subscribeFormSchema = formData?.fields && generateYupSchema(formData.fields);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: subscribeFormSchema ? yupResolver(subscribeFormSchema) : undefined });

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!formData?.action?.href) {
      console.error('No action URL found');
      return;
    }

    try {
      // Build query parameters for GET request
      const queryParams = new URLSearchParams();

      // Add static fields based on the sample data structure
      queryParams.append('u', '1');
      queryParams.append('f', '1');
      queryParams.append('s', '');
      queryParams.append('c', '0');
      queryParams.append('m', '0');
      queryParams.append('act', 'sub');
      queryParams.append('v', '2');
      queryParams.append('or', 'cb9a0c9c5c636e8ac404a4e76e39a1e5');
      queryParams.append('jsonp', 'true');

      const leadData: Record<string, unknown> = {};

      // Map form fields to their expected names
      Object.entries(data).forEach(([key, value]) => {
        const stringValue = String(value); // Convert unknown to string
        // Find the field configuration to get proper mapping
        const fieldConfig = formData.fields?.find(
          (field) => field.input?.name === key || field.locations?.name === key
        );

        if (fieldConfig?.input?.name === key) {
          queryParams.append(key, stringValue);
        } else if (fieldConfig?.locations?.name === key) {
          queryParams.append('field[78]', stringValue);
        } else {
          console.log(`Unknown field: ${key} = ${stringValue}`);
        }
        leadData[key] = stringValue;
      });

      // Build the complete URL with query parameters
      const actionUrl = new URL(formData.action.href);
      actionUrl.search = queryParams.toString();

      // Submit the GET request
      const response = await fetch(actionUrl.toString(), {
        method: 'GET',
      });

      if (response.ok) {
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
            dataLayerInstance.trackFormSubmission('generate_lead', leadData);
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
    <div
      className={cn(
        'flex flex-col gap-5 justify-center',
        'mx-auto pt-5 pb-[36px]',
        'text-center text-steel-blue'
      )}
    >
      <div className="text-lg font-bold uppercase tracking-[1px]">
        <p {...getCSLPAttributes($?.form_title)}>{form_title}</p>
      </div>
      <div className="w-full flex gap-3 flex-wrap justify-center">
        <form
          method="GET"
          action={formData?.action?.href}
          className="w-full flex flex-col tablet:flex-row gap-[5px] tablet:gap-5 justify-center"
        >
          <FormFieldRenderer
            fields={formData?.fields || []}
            register={register}
            errors={errors}
            onFormSubmit={handleSubmit}
            customOnSubmit={handleFormSubmit}
            fieldClassNames={{
              input: {
                wrapper: 'w-full',
                element: cn(
                  'shadow-[0_2px_8px_0_rgba(43,46,49,0.16)]',
                  'w-full h-[35px] bg-input-bg text-input-text px-4 py-2 rounded-md text-sm'
                ),
              },
              locations: {
                wrapper: 'w-full',
                element: cn(
                  'shadow-[0_2px_8px_0_rgba(43,46,49,0.16)]',
                  'w-full bg-input-bg text-input-text px-4 py-2 rounded-md text-sm tablet:h-[35px]'
                ),
              },
              submit: {
                element: cn(
                  'py-2 px-4',
                  'w-full md:w-fit h-[36px]',
                  'text-[16px] font-semibold leading-[16px] tracking-[1.92px] text-white',
                  'border-2 border-steel-blue rounded-md',
                  'bg-steel-blue shadow-[0_2px_8px_0_rgba(43,46,49,0.36)]'
                ),
              },
            }}
          />
        </form>
      </div>
      <RichText
        className="text-center! text-[13px] [&_a]:text-steel-blue!"
        content={form_disclaimer}
        $={$?.form_disclaimer}
      />
    </div>
  );
};
