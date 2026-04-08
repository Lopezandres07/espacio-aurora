interface FormErrorProps {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null

  return (
    <p className='text-aurora-error text-sm mt-1 animate-pulse'>{message}</p>
  )
}
