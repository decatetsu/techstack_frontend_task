export const SuccessfulDeleteToast = (toast: any, message?: string) => toast({
  title: 'Apartments Deleted',
  description: message || "Apartment was successfully deleted.",
  status: 'success',
  duration: 5000,
  isClosable: true,
});

export const UnsuccessfulDeleteToast = (toast: any, message: string) => toast({
  title: 'Apartments Deletion Error',
  description: message,
  status: 'error',
  duration: 5000,
  isClosable: true,
});

export const SuccessfulCreateToast = (toast: any, message?: string) => toast({
  title: 'Apartments Created',
  description: message || "Apartment was successfully created.",
  status: 'success',
  duration: 5000,
  isClosable: true,
});

export const UnsuccessfulCreateToast = (toast: any, message: string) => toast({
  title: 'Apartments Creation Error',
  description: message,
  status: 'error',
  duration: 5000,
  isClosable: true,
});

export const UnsuccessfulLoadingToast = (toast: any, message: string) => toast({
  title: 'Apartments Loading Error',
  description: message,
  status: 'error',
  duration: 5000,
  isClosable: true,
});
