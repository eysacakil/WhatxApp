import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import Modal from 'react-modal';
import defaultUser from '../../assets/default-user.svg'; // Yeni sembolü import edin

Modal.setAppElement('#root'); // Eğer root id'si farklıysa, buna göre ayarlayın.

function ProfileUpdate() {
  const { profile, setProfile } = useProfile();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [profilePicture, setProfilePicture] = useState(profile.profilePicture);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const handleRemoveProfilePicture = () => {
    setProfilePicture('');
  };

  const handleSave = () => {
    setProfile({ firstName, lastName, profilePicture });
    setModalIsOpen(true);
    setTimeout(() => {
      setModalIsOpen(false);
      navigate('/');
    }, 2000);
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
        <input
          type="text"
          placeholder="İsim"
          value={firstName}
          onChange={handleFirstNameChange}
          className='mb-4 p-2 rounded-md bg-[#3b4a54] text-white w-full'
        />
        <input
          type="text"
          placeholder="Soyisim"
          value={lastName}
          onChange={handleLastNameChange}
          className='mb-4 p-2 rounded-md bg-[#3b4a54] text-white w-full'
        />
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
