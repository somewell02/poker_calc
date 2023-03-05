import { ref, reactive, watch, computed, Ref, ComputedRef } from "vue";

interface initField {
  value: string;
  validators: Record<string, (val: string) => boolean>;
}

interface field {
  valid: Ref<boolean>;
  value: Ref<string>;
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

  const valid = computed<boolean>(() =>
    Object.keys(fields).reduce(
      (res: boolean, key: string): boolean => res && fields[key].valid.value,
      true
    )
  );

  for (const key of Object.keys(init)) {
    fields[key] = useField({
      value: init[key].value,
      validators: init[key].validators,
    });
  }

  return {
    fields,
    valid,
    submitted,
  };
};

export const useField = (field: initField): field => {
  const valid = ref<boolean>(true);
  const value = ref<string>(field.value);
  const errors = reactive<Record<string, boolean>>({});

  const reassign = (val: string) => {
    valid.value = true;
    for (const [key, validate] of Object.entries(field.validators ?? {})) {
      const isValid = validate(val);
      errors[key] = !isValid;
      if (!isValid) valid.value = false;
    }
  };

  watch(value, reassign);
  reassign(value.value);

  return {
    value,
    valid,
    errors,
  };
};
