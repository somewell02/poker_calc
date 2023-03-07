import { ref, reactive, computed, Ref, ComputedRef } from "vue";

interface initField {
  value: string;
  validators: Record<string, (val: string) => boolean>;
}

interface field {
  value: Ref<string>;
  valid: ComputedRef<boolean>;
  inputValid: ComputedRef<boolean | null>;
  errors: Record<string, boolean>;
}

interface form {
  fields: Record<string, field>;
  valid: ComputedRef<boolean>;
  submitted: Ref<boolean>;
}

export const useForm = (init: Record<string, initField>): form => {
  const fields = reactive<Record<string, field>>({});
  const submitted = ref<boolean>(false);

  const valid = computed<boolean>(() => {
    return Object.keys(fields).reduce(
      (res: boolean, key: string) => res && !!fields[key].valid,
      true
    );
  });

  for (const key of Object.keys(init)) {
    const field = useField({
      value: init[key].value,
      validators: init[key].validators,
    });
    field.inputValid = computed(() =>
      submitted.value && !field.valid.value ? false : null
    );
    fields[key] = field;
  }

  return {
    fields,
    valid,
    submitted,
  };
};

export const useField = (field: initField): field => {
  const value = ref<string>(field.value);
  const errors = reactive<Record<string, boolean>>({});

  const valid = computed<boolean>(() => {
    const validators = Object.entries(field.validators ?? {});
    return validators.reduce((res: boolean, [key, validate]) => {
      const isValid = validate(value.value);
      errors[key] = !isValid;
      return res && isValid;
    }, true);
  });

  const inputValid = computed(() => null);

  return {
    value,
    valid,
    inputValid,
    errors,
  };
};
