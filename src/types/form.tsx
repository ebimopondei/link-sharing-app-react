import { ChangeEvent, FormEvent, ReactNode } from "react";

export interface InputFieldType {
  type: React.HTMLInputTypeAttribute,
  input?:ShareableLinks,
  className?: string,
  placeholder?: string,
  Icon?: ReactNode,
  success?: boolean,
  error?: boolean,
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  onClick?: (e:FormEvent<HTMLFormElement>)=>void,
  message?: string,
}

export interface InputTextFieldType {
  // type: React.HTMLInputTypeAttribute,
  name: string,
  value?: string,
  // input?:ShareableLinks,
  className?: string,
  placeholder?: string,
  Icon?: ReactNode,
  success?: boolean,
  error?: boolean,
  onChange?: (e:ChangeEvent<HTMLInputElement>) => void,
  // onClick?: (e:FormEvent<HTMLFormElement>)=>void,
  message?: string,
}

export interface InputSubmitButtonType {
  name: string,
  value: string,
  className?: string,
  Icon?: ReactNode
}
  
export interface ButtonType {
  name: string,
  className?: string,
  Icon?: ReactNode,
  success?: boolean,
  disabled?: boolean,
  iconPosition?: 'left' | 'right';
  error?: boolean,
  onClick?: ()=>void
}

export type SelectOptions = {
  label: string;
  value: string;
};

export interface SelectProps {
  options: SelectOptions[];
  name:string,
  value?: ShareableLinks;
  onChange?: (opt: SelectOptions) => void,
  placeholder?: string;
  className?: string;
}

export interface ShareableLinks {
  id: string,
  order?:number,
  platform: string,
  url: string,
}

export interface Avatar {
    image: File | string,
    preview: string,
}