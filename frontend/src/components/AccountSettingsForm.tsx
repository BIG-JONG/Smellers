import React, { useState } from 'react';
import InputField from '@/components/InputField'; // InputField 컴포넌트 임포트
import Button from '@/components/Button';     // Button 컴포넌트 임포트
import Alert from '@/components/Alert';       // Alert 컴포넌트 임포트

// AccountSettingsForm 컴포넌트가 받을 props를 정의합니다.
interface AccountSettingsFormProps {
  // 계정 설정 변경 성공 시 호출될 함수 (예: 알림 표시, 모달 닫기 등)
  onSaveSuccess?: (message: string) => void;
  // 계정 설정 변경 실패 시 호출될 함수 (예: 오류 알림 표시)
  onSaveError?: (message: string) => void;
}

const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  onSaveSuccess,
  onSaveError,
}) => {
  // --- 상태 관리 ---
  // 비밀번호 변경을 위한 입력 필드 상태
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // 입력 필드별 에러 메시지 상태 (InputField의 error prop 사용)
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

  // 알림 메시지 상태 (Alert 컴포넌트용)
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // --- 유틸리티 함수: 알림 표시 ---
  const showAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    // Alert 컴포넌트는 onClose prop을 받지 않으므로, 여기서 직접 숨김 로직 구현.
    setTimeout(() => setIsAlertVisible(false), 3000); // 3초 후 자동 숨김
  };

  // --- 이벤트 핸들러: 폼 제출 ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    // 에러 메시지 초기화
    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmNewPasswordError('');

    let hasError = false;

    // --- 유효성 검사 ---
    if (!currentPassword) {
      setCurrentPasswordError('현재 비밀번호를 입력해주세요.');
      hasError = true;
    }
    if (!newPassword) {
      setNewPasswordError('새 비밀번호를 입력해주세요.');
      hasError = true;
    }
    if (!confirmNewPassword) {
      setConfirmNewPasswordError('새 비밀번호 확인을 입력해주세요.');
      hasError = true;
    }

    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError('새 비밀번호가 일치하지 않습니다.');
      hasError = true;
    }

    if (newPassword && newPassword.length < 6) {
      setNewPasswordError('새 비밀번호는 최소 6자 이상이어야 합니다.');
      hasError = true;
    }

    if (hasError) {
      showAlert('입력 정보를 다시 확인해주세요.', 'error');
      if (onSaveError) onSaveError('입력 정보 오류');
      return;
    }

    // --- 비밀번호 변경 로직 (나중에 백엔드 API 연동) ---
    console.log('비밀번호 변경 시도:', { currentPassword, newPassword });
    // 백엔드 API 호출 로직이 여기에 들어갑니다.
    // 임시 성공/실패 처리
    // 실제 API 호출 후 성공/실패 여부에 따라 showAlert와 onSaveSuccess/onSaveError 호출
    const isPasswordChangeSuccessful = true; // 임시로 항상 성공으로 설정

    if (isPasswordChangeSuccessful) {
      showAlert('비밀번호가 성공적으로 변경되었습니다!', 'success');
      if (onSaveSuccess) onSaveSuccess('비밀번호가 성공적으로 변경되었습니다!');
      // 폼 필드 초기화
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      showAlert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.', 'error');
      if (onSaveError) onSaveError('비밀번호 변경에 실패했습니다.');
    }
  };

  return (
    <section className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">계정 설정</h2>

      {/* 알림 컴포넌트 */}
      {isAlertVisible && (
        <Alert message={alertMessage} type={alertType} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 현재 비밀번호 입력 필드 */}
        <InputField
          label="현재 비밀번호"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={currentPasswordError} 

        />

        {/* 새 비밀번호 입력 필드 */}
        <InputField
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호를 입력하세요 (6자 이상)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={newPasswordError} // InputField는 error prop을 받습니다.

        />

        {/* 새 비밀번호 확인 입력 필드 */}
        <InputField
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          error={confirmNewPasswordError} 

        />

        {/* 저장 버튼 */}
        <Button
          type="submit"
        >
          비밀번호 변경
        </Button>
      </form>
    </section>
  );
};

export default AccountSettingsForm;