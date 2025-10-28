'use client';
import { IForm } from '@/lib/generated';
import { generateYupSchema } from '@/utils/yup-schema-generator';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldRenderer } from './form-elements/FormFieldRenderer';
import { Container } from '@/components/primitives/Container';
import { cn } from '@/utils/cn';
import { useGlobalLabels } from '@/providers/GlobalLabelsProvider';
import { dataLayerInstance } from '@/utils/gtm-utils';

export const Lessons = ({ form_name, fields, action, method, enable_recaptcha }: IForm) => {
  const { globalLabels } = useGlobalLabels();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const schema = fields && generateYupSchema(fields);

  const getDefaultValues = () => {
    const defaults: Record<string, string[]> = {};
    fields?.forEach((field) => {
      if (field.radio_checkbox?.type === 'Checkbox') {
        defaults[field.radio_checkbox.name] = [];
      }
    });
    return defaults;
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: schema ? yupResolver(schema) : undefined,
    defaultValues: getDefaultValues(),
  });

  const handleFormSubmit = async (data: Record<string, unknown>) => {
    if (!action?.href) {
      return;
    }

    setIsSubmitting(true);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append('u', '36');
      queryParams.append('f', '36');
      queryParams.append('s', '');
      queryParams.append('c', '0');
      queryParams.append('m', '0');
      queryParams.append('act', 'sub');
      queryParams.append('v', '2');
      queryParams.append('or', '2ddb5b768d76df83fd5aea4d20b1906a');
      queryParams.append('jsonp', 'true');

      let userIP = '';
      try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        userIP = ipData.ip;
      } catch {
        userIP = '';
      }

      const userAgent = navigator.userAgent || '';

      queryParams.append('field[157]', userIP);
      queryParams.append('field[158]', userAgent);

      if (enable_recaptcha) {
        const recaptchaToken = data._recaptchaToken as string;
        if (recaptchaToken) {
          queryParams.append('g-recaptcha-response', recaptchaToken);
        }
      }

      Object.entries(data).forEach(([key, value]) => {
        if (key.startsWith('_')) return;

        const stringValue = String(value);
        const fieldConfig = fields?.find(
          (field) =>
            field.input?.name === key ||
            field.locations?.name === key ||
            field.radio_checkbox?.name === key
        );

        if (fieldConfig?.input?.name === key) {
          queryParams.append(key, stringValue);
        } else if (fieldConfig?.locations?.name === key) {
          queryParams.append('field[152]', stringValue);
        } else if (fieldConfig?.radio_checkbox?.name === key) {
          const checkboxValues = Array.isArray(value)
            ? value.map(String)
            : typeof value === 'string'
            ? (() => {
                try {
                  const parsed = JSON.parse(stringValue);
                  return Array.isArray(parsed) ? parsed : [stringValue];
                } catch {
                  return [stringValue];
                }
              })()
            : [stringValue];

          checkboxValues.forEach((item) => {
            queryParams.append('field[166][]', item);
          });
        }
      });

      const actionUrl = new URL(action.href);
      actionUrl.search = queryParams.toString();

      const response = await fetch(actionUrl.toString(), {
        method: 'GET',
      });

      if (response.ok) {
        dataLayerInstance.trackFormSubmission('lessons', data);
        setIsSubmitted(true);
        reset();
      }
    } catch {
      // Error handling could be added here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Container componentName="LeaguesForm">
        <div className="text-center">
          <h1 className="text-[30px] font-bold text-[#fd4a5c] mb-4 leading-tight">
            {globalLabels.thanks_for_signing_up_label}
          </h1>
        </div>
      </Container>
    );
  }
  return (
    <Container componentName="LeaguesForm">
      <form
        name={form_name}
        method={method as string}
        action={action?.href}
        className="grid grid-cols-12 gap-x-6 gap-y-11"
      >
        <FormFieldRenderer
          fields={fields || []}
          register={register}
          errors={errors}
          fieldClassNames={{
            input: {
              wrapper: cn('col-span-12 tablet:col-span-6'),
              element:
                'w-full py-[14px] px-[16px] border-2 border-[#048DCA] rounded-[6px] text-[#374151] text-[20px] bg-white placeholder:text-[#9CA3AF] outline-none',
            },
            locations: {
              wrapper: 'col-span-6',
              element:
                'w-full py-[14px] px-[16px] border-2 border-[#048DCA] rounded-[6px] text-black text-[20px] bg-white outline-none',
            },
            disclaimer: {
              wrapper: 'col-span-12',
              element: 'text-[16px] text-black ',
            },
            checkbox: {
              wrapper: 'col-span-12',
              element:
                'w-3 h-3 text-blue-600 bg-white border-2 border-[#048DCA] rounded focus:ring-blue-500 focus:ring-2 cursor-pointer',
              label: 'text-[24px] text-[#757575] block',
              itemLabel: 'text-[20px] text-black cursor-pointer',
            },
            submit: {
              wrapper: cn('col-span-12 flex flex-col gap-6 items-start'),
              element: cn(
                isSubmitting
                  ? 'py-[14px] px-[42px] bg-gray-400 text-white rounded-[8px] font-semibold text-[21px] uppercase cursor-not-allowed border-2 border-gray-400'
                  : 'py-[14px] px-[42px] bg-black text-white rounded-[8px] font-semibold text-[21px] uppercase cursor-pointer border-2 border-black outline-none hover:bg-transparent hover:text-black transition-colors duration-200'
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
