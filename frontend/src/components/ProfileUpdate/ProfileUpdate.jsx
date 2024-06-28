import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import axios from '../../axiosConfig';
import Modal from 'react-modal';
import defaultUser from '../../assets/default-user.svg'; // Yeni sembolü import edin

Modal.setAppElement('#root'); // Eğer root id'si farklıysa, buna göre ayarlayın.

function ProfileUpdate() {
  const { profile, setProfile } = useProfile();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const handleRemoveProfilePicture = async () => {
    setProfilePicture('');

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.put(`http://localhost:5000/api/users/${user.userId}`, {
        profilePicture: '',
      });
      setProfile(response.data);
      setModalIsOpen(true);
      setTimeout(() => {
        setModalIsOpen(false);
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error removing profile picture', error);
      setErrorMessage('Profil resmi kaldırılırken bir hata oluştu.');
    }
  };

  const handleSave = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    // Eğer profil resmi seçilmişse, önce resmi imgbb'ye yükleyin
    let uploadedImageUrl = profilePicture;
    if (profilePicture && profilePicture !== profile.profilePicture) {
      try {
        const imgAPIKey = '9aa32698e954bcfa705a6ce7bd865b6e';
        const formData = new FormData();
        formData.append('image', profilePicture.split(',')[1]); // Data URL'in base64 kısmını alın
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgAPIKey}`, {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        uploadedImageUrl = result.data.url;
      } catch (error) {
        console.error('Error uploading image', error);
        setErrorMessage('Profil resmi yüklenirken bir hata oluştu.');
        return;
      }
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${user.userId}`, {
        profilePicture: uploadedImageUrl,
      });
      setProfile(response.data);
      setModalIsOpen(true);
      setTimeout(() => {
        setModalIsOpen(false);
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error updating profile', error);
      setErrorMessage('Profil güncellenirken bir hata oluştu.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-[#202d33] text-white'>
      <h1 className='text-2xl mb-4'>Profili Güncelle</h1>
      <div className='flex flex-col items-center bg-[#2a3942] p-8 rounded-md shadow-md w-[400px]'>
        <img
          src={profilePicture || defaultUser}
          alt="Profile"
          className='rounded-full w-[100px] h-[100px] mb-4'
        />
        {profilePicture && (
          <button
            onClick={handleRemoveProfilePicture}
            className='mb-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700'
          >
            Profil Fotoğrafını Kaldır
          </button>
        )}
        <label className='mb-4 cursor-pointer bg-emerald-500 px-4 py-2 rounded-md hover:bg-emerald-700'>
          Profil Fotoğrafı Seç
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className='hidden'
          />
        </label>
        
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <button
          onClick={handleSave}
          className='bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-700'
        >
          Kaydet
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Profile Updated"
        className="modal bg-[#2a3942] text-white rounded-md p-4"
        overlayClassName="modal-overlay bg-black bg-opacity-50"
      >
        <h2>Profil güncellendi!</h2>
      </Modal>
    </div>
  );
}

export default ProfileUpdate;
