import { accessLocalStorage, Battery, Rental, User } from './handlers'

// 募集中（user1,user2,user3）
// 貸し出しリクエスト（貸し手user4,借り手user5）
// リクエスト承認（貸し手user6,借り手user7）
// 貸し出し開始（貸し手user8,借り手user9）

export const seed = (callback: () => void) => {
  const [, setUser] = accessLocalStorage<User>('ict-solution-user')
  const [, setBattery] = accessLocalStorage<Battery>('ict-solution-battery')
  const [, setRental] = accessLocalStorage<Rental>('ict-solution-rental')

  localStorage.clear()
  sessionStorage.clear()

  setUser(JSON.stringify(users))
  setBattery(JSON.stringify(batteries))
  setRental(JSON.stringify(rentals))

  callback()
}

const users = [
  {
    id: '5a2b26bb-da1e-4a99-97d1-37d4bf6ad2c7',
    review: '4',
    name: 'test1',
    password: 'test1',
  },
  {
    id: '234d6c8d-c14b-468c-899b-5edb6891793a',
    review: '3',
    name: 'test2',
    password: 'test2',
  },
  {
    id: 'd61ff131-ed24-4375-9f1e-5aeb315be863',
    review: '5',
    name: 'test3',
    password: 'test3',
  },
  {
    id: '402e9320-837c-49aa-b17b-fafddc9ae9d0',
    review: '3',
    name: 'test4',
    password: 'test4',
  },
  {
    id: 'f4980ae1-8c18-4099-b940-5b19344e7b88',
    review: '1',
    name: 'test5',
    password: 'test5',
  },
  {
    id: 'b2c644ac-0c9d-4d78-ad68-a4c06e478d97',
    review: '4',
    name: 'test6',
    password: 'test6',
  },
  {
    id: 'c5e76f58-4778-489d-b54f-7fdd94f5db2b',
    review: '4',
    name: 'test7',
    password: 'test7',
  },
  {
    id: 'be141e1e-6ece-4b37-86c1-e3b8a8a03e8a',
    review: '2',
    name: 'test8',
    password: 'test8',
  },
  {
    id: '3d56a055-09d3-4ad5-ac36-60c82dcf99e2',
    review: '5',
    name: 'test9',
    password: 'test9',
  },
]

const rentals = [
  {
    id: 'a89b9c7e-474f-4169-8c62-a8c8ade96de6',
    borrowerId: '',
    status: 'available',
    otp: '824600',
    batteryId: '93facec3-8978-49fb-a095-801ed650e173',
    due: '2023-11-27T01:00:00.000Z',
    lat: 36.569027237789996,
    lng: 140.63221798416998,
  },
  {
    id: '17a67b7a-1596-427d-a393-2f424dcf4aa0',
    borrowerId: '',
    status: 'available',
    otp: '106560',
    batteryId: '62a27f97-e037-414f-ad47-f101b12eb6af',
    due: '2023-11-27T09:20:00.000Z',
    lat: 36.57552723778999,
    lng: 140.61951798417,
  },
  {
    id: 'c20a06c6-cc3e-46c2-97b6-c2aa632f0d5f',
    borrowerId: '',
    status: 'available',
    otp: '838000',
    batteryId: 'bbf148f7-a431-4980-b1b5-4aa3a9b5b10d',
    due: '2023-11-27T06:00:00.000Z',
    lat: 36.57722723778999,
    lng: 140.63561798416998,
  },
  {
    id: 'aa7740e9-16b6-4b23-a7fd-162f7b7739f4',
    borrowerId: 'f4980ae1-8c18-4099-b940-5b19344e7b88',
    status: 'reserved',
    otp: '351700',
    batteryId: 'a0e1b867-f28d-4601-b4d3-b7e6db991d93',
    due: '2023-11-27T04:30:00.000Z',
    lat: 36.583727237789994,
    lng: 140.64071798416998,
  },
  // {
  //   id: '92680a81-f413-49c5-a3f2-2e99a0ef5f82',
  //   borrowerId: '',
  //   status: 'available',
  //   otp: '189770',
  //   batteryId: '2b6ebed7-12c1-4d7f-9abc-008f741971a8',
  //   due: '2023-11-26T23:00:00.000Z',
  //   lat: 36.58812723778999,
  //   lng: 140.61711798417,
  // },
  {
    id: '2bbf3bd9-3fe3-43de-a2d4-3e3eec47cd3d',
    borrowerId: 'c5e76f58-4778-489d-b54f-7fdd94f5db2b',
    status: 'approved',
    otp: '296420',
    batteryId: '306dd7ba-74b5-4788-84e1-702cb19a54c6',
    due: '2023-11-27T10:30:00.000Z',
    lat: 36.57442723779,
    lng: 140.61891798417,
  },
  // {
  //   id: '299df054-7e2b-4f6b-a274-9f272994b109',
  //   borrowerId: '',
  //   status: 'available',
  //   otp: '354900',
  //   batteryId: '6d2c3554-919c-43b7-87b4-d81b17302373',
  //   due: '2023-11-27T04:20:00.000Z',
  //   lat: 36.58902723778999,
  //   lng: 140.63361798417,
  // },
  {
    id: '6f9873d4-5899-4217-bfc6-4d2202f0daf1',
    borrowerId: '3d56a055-09d3-4ad5-ac36-60c82dcf99e2',
    status: 'started',
    otp: '620900',
    batteryId: '014e9e27-eb12-4bd5-a734-44c5271fb261',
    due: '2023-11-28T03:00:00.000Z',
    lat: 36.57942723778999,
    lng: 140.62731798417,
  },
  // {
  //   id: '5ee8ff3a-2ac1-40a2-8042-b7cd1bc17802',
  //   borrowerId: '',
  //   status: 'available',
  //   otp: '267300',
  //   batteryId: '56eff99e-7d94-412f-9c79-02ebf01aa93e',
  //   due: '2023-11-27T03:10:00.000Z',
  //   lat: 36.590827237789995,
  //   lng: 140.63171798417,
  // },
]

const batteries = [
  {
    id: '93facec3-8978-49fb-a095-801ed650e173',
    name: 'Anker PowerCore Magnetic 5000',
    connector: 'USB-C',
    note: '',
    ownerId: '5a2b26bb-da1e-4a99-97d1-37d4bf6ad2c7',
  },
  {
    id: '62a27f97-e037-414f-ad47-f101b12eb6af',
    name: 'Anker Nano Power Bank',
    connector: 'lightning',
    note: 'lightning端子が本体についているため充電ケーブル不要です',
    ownerId: '234d6c8d-c14b-468c-899b-5edb6891793a',
  },
  {
    id: 'bbf148f7-a431-4980-b1b5-4aa3a9b5b10d',
    name: 'ADATA Power Bank AP10000QCD',
    connector: 'USB-C',
    note: '',
    ownerId: 'd61ff131-ed24-4375-9f1e-5aeb315be863',
  },
  {
    id: 'a0e1b867-f28d-4601-b4d3-b7e6db991d93',
    name: 'グリーンハウス GH-BTR200',
    connector: 'USB-C',
    note: 'Nintendo Switch対応です',
    ownerId: '402e9320-837c-49aa-b17b-fafddc9ae9d0',
  },
  // {
  //   id: '2b6ebed7-12c1-4d7f-9abc-008f741971a8',
  //   name: 'エレコム DE-C40-5000',
  //   connector: 'USB-C',
  //   note: 'MagSafe対応です',
  //   ownerId: 'f4980ae1-8c18-4099-b940-5b19344e7b88',
  // },
  {
    id: '306dd7ba-74b5-4788-84e1-702cb19a54c6',
    name: 'Anker Astro E1 6700',
    connector: 'USB-A',
    note: '',
    ownerId: 'b2c644ac-0c9d-4d78-ad68-a4c06e478d97',
  },
  // {
  //   id: '6d2c3554-919c-43b7-87b4-d81b17302373',
  //   name: 'Anker Prime Power Bank',
  //   connector: 'USB-C',
  //   note: '',
  //   ownerId: 'c5e76f58-4778-489d-b54f-7fdd94f5db2b',
  // },
  {
    id: '014e9e27-eb12-4bd5-a734-44c5271fb261',
    name: 'Anker 334 MagGo Battery',
    connector: 'USB-C',
    note: '',
    ownerId: 'be141e1e-6ece-4b37-86c1-e3b8a8a03e8a',
  },
  // {
  //   id: '56eff99e-7d94-412f-9c79-02ebf01aa93e',
  //   name: 'Anker PowerCore Fusion 10000',
  //   connector: 'USB-C',
  //   note: '電源プラグ付きで充電器としても使えます',
  //   ownerId: '3d56a055-09d3-4ad5-ac36-60c82dcf99e2',
  // },
]
