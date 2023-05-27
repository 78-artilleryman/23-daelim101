import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ref, listAll, getDownloadURL } from 'firebase/storage';
import { auth, storage } from './firebase-config';
import './styles/vs16Man.css';

function VsPage16() {
  const [groups, setGroups] = useState([]);
  const [winnerDisplay, setWinnerDisplay] = useState(false);
  const [roundCount, setRoundCount] = useState(1);
  const [totalRound, setTotalRound] = useState(8);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const listAllImages = async () => {
      try {
        const foldersRef = ref(storage, 'user-M/');
        const foldersSnapshot = await listAll(foldersRef);

        const selectedFolders = [];
        const imagesRefs = [];
        const imagesSnapshots = [];
        const urls = [];

        while (selectedFolders.length < 16) {
          const randomFolderIndex = Math.floor(Math.random() * foldersSnapshot.prefixes.length);
          const selectedFolder = foldersSnapshot.prefixes[randomFolderIndex];

          if (!selectedFolders.includes(selectedFolder)) {
            selectedFolders.push(selectedFolder);

            imagesRefs.push(ref(storage, selectedFolder));
            imagesSnapshots.push(await listAll(imagesRefs[imagesRefs.length - 1]));

            urls.push(await getDownloadURL(imagesSnapshots[imagesSnapshots.length - 1].items[0]));
          }
        }

        const images = urls.map((url, index) => ({
          name: imagesSnapshots[index].items[0].name,
          src: url,
        }));

        const shuffledImages = shuffleArray(images);
        const groupedImages = groupArray(shuffledImages, 2);
        setGroups(groupedImages);
        setParticipants(groupedImages.flat());
      } catch (error) {
        console.log(error);
      }
    };

    listAllImages();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const groupArray = (array, size) => {
    const grouped = [];
    for (let i = 0; i < array.length; i += size) {
      grouped.push(array.slice(i, i + size));
    }
    return grouped;
  };

  const handleSelection = (selectedParticipants) => {
    const remainingParticipants = participants.filter((p) => !selectedParticipants.includes(p));

    if (remainingParticipants.length === 1) {
      setGroups([remainingParticipants]);
      setWinnerDisplay(true);
      setParticipants([remainingParticipants[0]]);
      setRoundCount(1);
      setTotalRound(totalRound / 2);
    } else {
      const shuffledParticipants = shuffleArray(remainingParticipants);
      const groupedParticipants = groupArray(shuffledParticipants, 2);
      setGroups(groupedParticipants);
      setParticipants(remainingParticipants);
      setRoundCount(roundCount + 1);
    }
  };

  const handleNextRound = () => {
    if (roundCount >= totalRound) {
      setWinnerDisplay(true);
      setGroups([participants]);
      setParticipants([participants[0]]);
    } else {
      const shuffledParticipants = shuffleArray(participants);
      const groupedParticipants = groupArray(shuffledParticipants, 2);
      setGroups(groupedParticipants);
      setParticipants(shuffledParticipants);
      setRoundCount(roundCount + 1);
    }
  };

  const handleRestart = () => {
    setWinnerDisplay(false);
    setRoundCount(1);
    setTotalRound(8);
  };

  return (
    <div className="page">
      <div className="card">
        {winnerDisplay ? (
          <div className="WC">
            <h1 className="title">최종</h1>
            {participants.length > 0 && (
              <div className="title">
                <img className="winnerhodu" src={participants[0].src} alt={participants[0].name} />
              </div>
            )}
            {participants.length > 0 && (
              <div className="title">
                <label>{participants[0].name}</label>
              </div>
            )}
            <div className="action">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <input type="submit" value="다시하기" onClick={handleRestart} />
              </Link>
              <input type="submit" value="공유하기" />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="title">이상형 월드컵 &nbsp;&nbsp;남성&nbsp;&nbsp;{roundCount}/{totalRound}</h1>
            <div className="basic">
              {groups.map((group, groupIndex) => (
                <div className="group" key={`group-${groupIndex}`}>
                  {group.map((participant, participantIndex) => (
                    <div className="vsImg" key={`participant-${groupIndex}-${participantIndex}`} onClick={() => handleSelection([participant])}>
                      <img className="kinghodu" src={participant.src} alt={participant.name} />
                      <div>{participant.name}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {roundCount < totalRound && (
              <div className="action">
                <input type="submit" value="다음 라운드" onClick={handleNextRound} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VsPage16;
