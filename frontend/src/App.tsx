//기본 컴포넌트 테스트

import React, { useState } from 'react';

// --- 기본 컴포넌트 임포트 ---
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

import Modal from '@/components/Modal';
import Alert from '@/components/Alert';
import Avatar from '@/components/Avatar';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Dropdown from '@/components/Dropdown';
import InputField from '@/components/InputField';
import ProductCard from '@/components/ProductCard';
import StarRating from '@/components/StarRating';
import Tag from '@/components/Tag';
import Textarea from '@/components/Textarea';
import Pagination from '@/components/Pagination';

function App() {
  // --- 상태 관리 (컴포넌트 테스트용) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info');
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [selectedDropdownItem, setSelectedDropdownItem] = useState('옵션 선택');
  const [starRatingValue, setStarRatingValue] = useState(3);
  const [currentPage, setCurrentPage] = useState(1); // Pagination 테스트용
  const totalPages = 5; // Pagination 테스트용

  // --- 이벤트 핸들러 ---
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const showAlert = (message: string, type: 'success' | 'error' | 'info') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000); // 3초 후 자동 숨김
  };

  const handleDropdownSelect = (item: string) => {
    setSelectedDropdownItem(item);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    showAlert(`페이지 ${page}로 이동`, 'info');
  };

  // --- 임시 데이터 (ProductCard 테스트용) ---
  const sampleProduct = {
    id: 'perfume-001',
    imageUrl: 'https://img.vogue.co.kr/vogue/2024/12/style_67618e13dd977-1050x1400.jpg',
    name: '퍼퓸 이브닝글로우',
    price: 130000,
    ingredients: ['로즈', '라즈베리', '머스크'],
    rating: 4.5,
    reviews: 120,
  };

  const sampleProducts = [
    { id: 'p1', name: '향수 A', price: 50000, imageUrl: 'https://placehold.co/300x400/FFDDC1/000000?text=Perfume+A', rating: 4.0, reviews: 10, ingredients: ['바닐라', '앰버'] },
    { id: 'p2', name: '향수 B', price: 75000, imageUrl: 'https://placehold.co/300x400/C1FFDD/000000?text=Perfume+B', rating: 3.5, reviews: 5, ingredients: ['시트러스', '민트'] },
    { id: 'p3', name: '향수 C', price: 120000, imageUrl: 'https://placehold.co/300x400/D1C1FF/000000?text=Perfume+C', rating: 4.8, reviews: 20, ingredients: ['라벤더', '샌달우드'] },
  ];

  // 이 App.tsx는 컴포넌트 테스트용이므로, 라우팅 로직은 포함하지 않습니다.
  // Header, Sidebar는 여기에 직접 렌더링하고, main 태그 안에 모든 컴포넌트 테스트 섹션을 넣습니다.
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-inter">
      {/* 1. 헤더 컴포넌트 */}
      <Header />

      {/* 2. 사이드바와 메인 콘텐츠를 담는 컨테이너 */}
      <div className="flex flex-grow">
        {/* 2.1. 사이드바 컴포넌트 */}
        <Sidebar />

        {/* 2.2. 메인 콘텐츠 영역 - 모든 컴포넌트 테스트 섹션 */}
        <main className="flex-grow flex flex-col items-center p-8 space-y-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
            AromaBase 기본 UI 컴포넌트 테스트 페이지
          </h1>

          {/* 2.2.1. 모달 컴포넌트 테스트 섹션 */}
          <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-700">모달 테스트</h2>
            <Button onClick={handleOpenModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
              모달 열기
            </Button>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="테스트 모달">
              <p className="text-gray-700 mb-4">
                이것은 모달 내용입니다. 모달이 잘 작동하는지 확인해 보세요!
              </p>
              <Button onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg">
                닫기
              </Button>
            </Modal>
          </section>

          {/* 2.2.2. 알림 컴포넌트 테스트 섹션 */}
          <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">알림 테스트</h2>
            <div className="flex justify-center space-x-4 mb-4">
              <Button onClick={() => showAlert('성공적으로 저장되었습니다!', 'success')} className="bg-green-600 hover:bg-green-700 text-white">
                성공 알림
              </Button>
              <Button onClick={() => showAlert('오류가 발생했습니다!', 'error')} className="bg-red-600 hover:bg-red-700 text-white">
                오류 알림
              </Button>
              <Button onClick={() => showAlert('정보를 확인하세요.', 'info')} className="bg-blue-600 hover:bg-blue-700 text-white">
                정보 알림
              </Button>
            </div>
            {isAlertVisible && (
              <Alert message={alertMessage} type={alertType} onClose={() => setIsAlertVisible(false)} />
            )}
          </section>

          {/* 2.2.3. 다양한 UI 컴포넌트 테스트 섹션 */}
          <section className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6">
            <h2 className="col-span-full text-2xl font-semibold mb-4 text-purple-700">UI 요소들</h2>

            {/* 아바타 */}
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-medium text-gray-700">아바타:</h3>
              <Avatar src="https://placehold.co/64x64/FF69B4/FFFFFF?text=User" alt="사용자 아바타" size="lg" />
              <Avatar src="https://placehold.co/48x48/6A5ACD/FFFFFF?text=A" alt="기본 아바타" />
            </div>

            {/* 입력 필드 */}
            <div>
              <InputField
                label="이름"
                type="text"
                placeholder="이름을 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">현재 입력: {inputValue}</p>
            </div>

            {/* 텍스트 영역 */}
            <div>
              <Textarea
                label="메시지"
                placeholder="메시지를 입력하세요"
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
              />
              <p className="text-sm text-gray-500 mt-1">현재 입력: {textareaValue.length}자</p>
            </div>

            {/* 체크박스 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeCheckbox"
                label="약관 동의"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <p className="text-sm text-gray-700">동의 여부: {isChecked ? '동의함' : '동의 안 함'}</p>
            </div>

            {/* 드롭다운 */}
            <div>
              <Dropdown
                options={['옵션 1', '옵션 2', '옵션 3']}
                onSelect={handleDropdownSelect}
                placeholder={selectedDropdownItem}
              />
              <p className="text-sm text-gray-500 mt-1">선택된 옵션: {selectedDropdownItem}</p>
            </div>

            {/* 별점 */}
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-700">별점:</h3>
              <StarRating rating={starRatingValue} onRatingChange={setStarRatingValue} maxRating={5} />
              <p className="text-sm text-gray-500 mt-1">현재 별점: {starRatingValue}점</p>
            </div>

            {/* 태그 */}
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium text-gray-700">태그:</h3>
              <Tag text="새로운" color="blue" />
              <Tag text="인기" color="red" />
              <Tag text="할인" color="green" />
            </div>
          </section>

          {/* 2.2.4. ProductCard 테스트 섹션 */}
          <section className="col-span-full w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-orange-700">ProductCard 테스트:</h3>
            <div className="flex flex-wrap justify-center gap-6">
              <ProductCard product={sampleProduct} />
              {sampleProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* 2.2.5. Pagination 테스트 섹션 */}
          <section className="col-span-full w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-4 text-pink-700">Pagination 테스트:</h3>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <p className="text-sm text-gray-500 mt-2">현재 페이지: {currentPage} / {totalPages}</p>
          </section>

        </main>
      </div>
      {/* 푸터 컴포넌트 (선택 사항, 필요시 주석 해제) */}
      {/* <Footer /> */}
    </div>
  );
}

export default App;
