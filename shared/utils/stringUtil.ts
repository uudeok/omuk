export const removeNonNumeric = (value: string): string => {
    // 숫자 외 모두 제거
    return value.replace(/\D/g, '');
};

export const keepNumericAndDot = (value: string): string => {
    // 숫자와 소수점만 남기고 제거
    console.log(value.replace(/[^0-9.]/g, ''));
    return value.replace(/[^0-9.]/g, '');
};

export const cutText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) : text;
};
