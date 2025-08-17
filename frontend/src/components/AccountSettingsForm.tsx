import React, { useState } from 'react';
import InputField from './InputField'; 
import Button from './Button';     
import Alert from './Alert';       

interface AccountSettingsFormProps {
  onSaveSuccess?: (message: string) => void;
  onSaveError?: (message: string) => void;
}

const AccountSettingsForm: React.FC<AccountSettingsFormProps> = ({
  onSaveSuccess,
  onSaveError,
}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setAlertMessage(message);
    setAlertType(type);
    setIsAlertVisible(true);
    setTimeout(() => setIsAlertVisible(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 

    setCurrentPasswordError('');
    setNewPasswordError('');
    setConfirmNewPasswordError('');

    let hasError = false;

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

    // console.log('비밀번호 변경 시도:', { currentPassword, newPassword });
    const isPasswordChangeSuccessful = true;

    if (isPasswordChangeSuccessful) {
      showAlert('비밀번호가 성공적으로 변경되었습니다!', 'success');
      if (onSaveSuccess) onSaveSuccess('비밀번호가 성공적으로 변경되었습니다!');
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

      {isAlertVisible && (
        <Alert message={alertMessage} type={alertType} />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="현재 비밀번호"
          type="password"
          placeholder="현재 비밀번호를 입력하세요"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={currentPasswordError} 

        />

        <InputField
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호를 입력하세요 (6자 이상)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          error={newPasswordError} // InputField는 error prop을 받습니다.

        />

        <InputField
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          error={confirmNewPasswordError} 

        />

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