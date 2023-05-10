
export function validatePhoneNumber(value) {
  if (value.length > 10 || value.length < 5) {
    return false;
  }
  return true;
}

