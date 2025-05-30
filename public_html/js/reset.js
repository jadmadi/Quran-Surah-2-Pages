// reset.js

// Add a reset button functionality
function addResetButton() {
    const buttonsContainer = document.querySelector('.buttons-container');
    if (buttonsContainer && !document.getElementById('resetButton')) {
        const resetButton = document.createElement('button');
        resetButton.id = 'resetButton';
        resetButton.classList.add('reset-button-style');
        resetButton.innerHTML = `
            مسح البيانات
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        `;
        resetButton.style.backgroundColor = '#dc3545';
        buttonsContainer.appendChild(resetButton);

        resetButton.addEventListener('click', function() {
            if (confirm('هل أنت متأكد من رغبتك في مسح جميع البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) {
                localStorage.removeItem('quranPageMarker');

                // Reset global state variables
                window.pageCounter = 1;
                window.pages = [];
                window.currentSurah = '';
                window.audioFileName = '';
                window.reciterName = '';
                window.selectedQiraat = '';
                window.selectedRawi = '';
                window.editingPageIndex = -1;

                // Reset UI elements
                const surahSelect = document.getElementById('surahSelect'); if (surahSelect) surahSelect.value = '';
                const reciterInput = document.getElementById('reciterInput'); if (reciterInput) reciterInput.value = '';
                const qiraatSelect = document.getElementById('qiraatSelect'); if (qiraatSelect) qiraatSelect.value = '';
                const fileNameDisplay = document.getElementById('fileName'); if (fileNameDisplay) fileNameDisplay.textContent = 'لم يتم تحميل ملف صوتي';

                const audio = document.getElementById('audio');
                if (audio) {
                    audio.src = '';
                    audio.load(); // Reset audio element state triggers 'emptied' event
                }
                 const currentTimeDisplay = document.getElementById('currentTimeDisplay'); if (currentTimeDisplay) currentTimeDisplay.textContent = '00:00.000';
                 const durationDisplay = document.getElementById('durationDisplay'); if (durationDisplay) durationDisplay.textContent = '00:00.000';
                 const audioSeeker = document.getElementById('audioSeeker'); if (audioSeeker) audioSeeker.value = 0;

                // Clear dynamic marking buttons
                const pageMarkingContainer = document.getElementById('pageMarkingContainer');
                if (pageMarkingContainer) {
                    pageMarkingContainer.innerHTML = '<p>الرجاء اختيار السورة لعرض أزرار الصفحات.</p>';
                }

                // Update page list display (will show empty state)
                if (typeof rebuildPageList === 'function') rebuildPageList();

                 // Clear timeline (handled by audio 'emptied' event)
                 // const timeline = document.getElementById('timeline'); if (timeline) timeline.innerHTML = '';

                 // Update audio info display
                 if(typeof window.updateAudioInfoDisplay === 'function') window.updateAudioInfoDisplay();

                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.textContent = 'تم مسح جميع البيانات بنجاح!';
                    successMessage.style.display = 'block';
                    setTimeout(() => { successMessage.style.display = 'none'; }, 2500);
                }
            }
        });
    }
}