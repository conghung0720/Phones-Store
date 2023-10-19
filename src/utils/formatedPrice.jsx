export const formattedPrice = (price) => price?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  