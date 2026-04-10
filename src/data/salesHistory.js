import { watchImage } from './mypage'

const baseProduct = {
  category: '럭셔리 > 시계 > 남성용 시계',
  image: watchImage,
  name: '롤렉스 시계',
  price: '1,500,000원',
  person: '구매자 김구매',
}

export const salesHistoryItems = [
  {
    ...baseProduct,
    status: '발송 대기',
    date: '2026.03.03',
    modalType: 'buyer-needs-address',
    shippingAddress: null,
    shippingInfo: null,
  },
  {
    ...baseProduct,
    status: '발송 대기',
    date: '2026.03.01',
    modalType: 'seller-needs-shipping-info',
    shippingAddress: {
      name: '김구매',
      phone: '010-1234-5678',
      zip: '06234',
      address1: '서울특별시 강남구 테헤란로 123',
      address2: '아크로타워 1502호',
    },
    shippingInfo: null,
  },
  {
    ...baseProduct,
    status: '배송중',
    date: '2026.02.28',
    modalType: 'readonly',
    shippingAddress: {
      name: '김구매',
      phone: '010-1234-5678',
      zip: '06234',
      address1: '서울특별시 강남구 테헤란로 123',
      address2: '아크로타워 1502호',
    },
    shippingInfo: {
      courier: '우체국 택배',
      trackingNumber: '1928391823798',
    },
  },
  {
    ...baseProduct,
    status: '구매 확정',
    date: '2026.02.26',
    modalType: 'readonly',
    shippingAddress: {
      name: '김구매',
      phone: '010-1234-5678',
      zip: '06234',
      address1: '서울특별시 강남구 테헤란로 123',
      address2: '아크로타워 1502호',
    },
    shippingInfo: {
      courier: '우체국 택배',
      trackingNumber: '1928391823798',
    },
  },
]

export const courierOptions = ['우체국 택배', 'CJ대한통운', '롯데택배', '한진택배']
