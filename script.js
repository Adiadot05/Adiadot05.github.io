// Ambil elemen balon dari DOM
const balloon = document.getElementById("balloon");



// Fungsi untuk mengubah warna latar belakang secara acak
function changeBalloonColor() {
    const newColor = randomColor(); // Panggil fungsi randomColor() untuk mendapatkan warna acak
    balloon.style.backgroundColor = newColor; // Atur warna latar belakang balon
}

// Fungsi untuk mengacak warna
function randomColor() {
    // Daftar warna yang mungkin
    const colors = ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"];

    // Pilih warna acak dari daftar warna
    return colors[Math.floor(Math.random() * colors.length)];
}

// Event listener untuk klik pada balon
balloon.addEventListener("click", changeBalloonColor);

// Fungsi untuk mengatur posisi balon secara acak di dalam layar
function setRandomPosition() {
    const balloonWidth = balloon.offsetWidth;
    const balloonHeight = balloon.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Menghasilkan posisi acak untuk balon di dalam layar
    const randomX = Math.floor(Math.random() * (screenWidth - balloonWidth));
    const randomY = Math.floor(Math.random() * (screenHeight - balloonHeight));

    // Menentukan posisi balon
    balloon.style.left = `${randomX}px`;
    balloon.style.top = `${randomY}px`;

}

// Fungsi untuk mengubah balon menjadi gambar
// Fungsi untuk mengubah balon menjadi gambar dan menempatkannya di tengah

// Fungsi untuk memainkan suara
function playSound() {
    const audio = new Audio('audio/bom.mp3');
    audio.play();
}


function convertBalloonToImage() {
    // Ganti isi balon dengan gambar
    const image = document.createElement("img");
    image.src = "img/balloon_pop.png";
    image.alt = "Balloon";
    image.style.position = "absolute";
    image.style.top = "50%";
    image.style.left = "50%";
    image.style.transform = "translate(-50%, -50%)";
    balloon.innerHTML = '';
    balloon.appendChild(image);
    
    playSound();
}

// Fungsi untuk menghapus balon dari DOM
function removeBalloon() {
    // Hapus elemen balon dari DOM
    balloon.remove();
}

// Fungsi untuk memainkan audio pop
function playPopSound() {
    // Ambil elemen audio
    const popSound = document.getElementById("popSound");
    // Memainkan audio
    popSound.play();
}

// Fungsi untuk mengatur animasi balon meletus
function explodeBalloon() {
    // Mengacak warna latar belakang balon
    changeBalloonColor();

    // Hapus kelas animasi sebelumnya jika ada
    balloon.classList.remove("animate");

    // Tambahkan kelas animasi ledakan
    balloon.classList.add("explode");

    // Tambahkan event listener untuk mendeteksi akhir animasi ledakan
    balloon.addEventListener("animationend", function() {
        // Hapus kelas animasi ledakan
        balloon.classList.remove("explode");

        // Kembalikan warna latar belakang balon ke warna awal setelah meletus
        balloon.style.backgroundColor = "#ff6384";

        // Atur posisi balon secara acak setelah meletus
        setRandomPosition();
        
        // Tambahkan satu ke angka balon
        const currentNumber = parseInt(balloon.textContent);
        balloon.textContent = currentNumber + 1;
        
        // Periksa apakah angka balon sudah mencapai 18
        if (currentNumber >= 18) {
            // Ganti balon menjadi gambar
            convertBalloonToImage();

            // Hapus balon setelah animasi selesai
            setTimeout(removeBalloon, 500); // Hapus setelah 1 detik
            // Memainkan suara pop setelah animasi selesai
            playPopSound();
            
            startTypewriterAnimation();
            

        } else {
            // Kembalikan animasi balon jika belum mencapai angka 18
            balloon.classList.add("animate");
        }
    }, {once: true}); // Pastikan event listener hanya berjalan sekali
}

// Event listener untuk klik pada balon
balloon.addEventListener("click", explodeBalloon);

// Inisialisasi variabel global untuk objek typewriter
let typewriter;

function startTypewriterAnimation() {
    typewriter = new Typewriter('#typewriter', {
        loop: false,
        delay: 75,
        cursor: "|",
    });

    typewriter
        .pauseFor(1500)
        .typeString('Happy Birthday 🎂, sayang 😁')
        .pauseFor(500)
        .typeString('<br>Maaf ya buat kamu kaget hehe')
        .callFunction(() => {
            // Ambil elemen button
            const buttonAnimation = document.querySelector(".button-animation");

            // Event listener untuk menghilangkan button setelah diklik
            buttonAnimation.addEventListener("click", function() {
                buttonAnimation.style.display = "none"; // Menghilangkan button setelah diklik
                typewriter.deleteAll().typeString('Semoga yang belum tersemogakan tersemogakan😄').start(); // Menampilkan pesan baru setelah tombol diklik
            });

            // Tampilkan tombol setelah animasi typewriter selesai
            buttonAnimation.style.display = "block";
            buttonAnimation.style.opacity = "0";
            buttonAnimation.style.animation = "pudarMasuk 2s forwards";
        })
        .start();
}

// Event listener untuk memulai ulang animasi typewriter
document.querySelector(".button-animation").addEventListener("click", function() {
    setTimeout(() => {
        fadeInImg();
    }, 5000);
    
});

function fadeInImg() {
    const fadeImg = document.querySelector(".fade-in-img");
    const wrapper = document.querySelector(".wrapper");
    const typewriterUngkapan = document.querySelector(".typewriter-ungkapan");

    // Atur gambar dan wrapper
    fadeImg.src = "img/cewe/eca-cantik.jpg";
    fadeImg.alt = "Eca Cantik";
    fadeImg.style.width = "200px";
    fadeImg.style.marginTop = "20px";
    fadeImg.style.opacity = "0"; // Set opacity awal menjadi 0
    fadeImg.style.border = "4px solid #fff";
    fadeImg.style.borderRadius = "10px";
    fadeImg.style.boxShadow = "0px 0px 0px 10px rgba(255, 255, 255 ,0.5)";
    fadeImg.style.marginBottom = "20px";
    
    // Atur wrapper untuk menempatkan gambar di tengah layar
    wrapper.style.width = "100vw";
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    wrapper.style.flexDirection = "column";

    typewriterUngkapan.style.width = "100vw";

    // Animasi fade in dengan interval 30ms
    let opacity = 0;
    const timer = setInterval(function() {
        // Tingkatkan opacity secara bertahap
        opacity += 0.01;
        // Atur opacity gambar
        fadeImg.style.opacity = opacity;
        // Hentikan animasi saat opacity mencapai 1
        if (opacity >= 1) {
            clearInterval(timer);
            
            startGalleryAnimation();
        }
    }, 50);
}

function startGalleryAnimation() {
    const gallery = document.querySelector(".gallery");
    const galleryImgs = document.querySelectorAll(".gallery img"); // Ambil semua gambar dalam galeri

    gallery.style.display = "flex"; // Tampilkan galeri

    // Hitung jumlah gambar yang sudah ditampilkan
    let displayedCount = 0;

    // Fungsi untuk menampilkan gambar dengan delay
    function showImageWithDelay(index) {
        setTimeout(() => {
            // Terapkan animasi fade-in
            galleryImgs[index].style.animation = "fadeIn 1s ease forwards";

            // Tambahkan event listener untuk mendeteksi akhir animasi
            galleryImgs[index].addEventListener("animationend", function() {
                // Tambahkan 1 ke jumlah gambar yang sudah ditampilkan
                displayedCount++;

                // Jika semua gambar telah ditampilkan, panggil startTypewriterAnimationUngkapan()
                if (displayedCount === galleryImgs.length) {
                    startTypewriterAnimationUngkapan();
                }
            });
        }, index * 1000); // Delay setiap gambar sebesar 1 detik
    }

    // Memulai menampilkan gambar satu persatu
    for (let i = 0; i < galleryImgs.length; i++) {
        showImageWithDelay(i);
    }
}

function startTypewriterAnimationUngkapan() {
    const typewriter = new Typewriter('.typewriter-ungkapan', {
        loop: false,
        delay: 75,
    });

    typewriter
        .typeString('Ini foto kamu yang menurutku paling cantik😊')
        .callFunction(() => {
            setTimeout(() => {
                typewriter.deleteAll()
                    .typeString('dan aku punya beberapa foto lagi😁')
                    .callFunction(() => {
                        const buttonAnimation = document.querySelector(".button-animation-next");
                        const typeWriterUngkapan = document.querySelector(".typewriter-ungkapan");
                        const gallery = document.querySelector(".gallery");
                        const wrapper = document.querySelector(".wrapper");
                        const typewriter = document.querySelector(".typewriter");
                        const textImage = document.querySelector(".text-image");

                        // Event listener untuk menghilangkan elemen setelah diklik
                        buttonAnimation.addEventListener("click", function() {
                            // Menghilangkan elemen yang tidak perlu
                            buttonAnimation.remove();
                            typeWriterUngkapan.remove();
                            gallery.remove();
                            wrapper.remove();
                            typewriter.remove();
                            startTypewriterText();
                       // Menampilkan container gambar setelah tombol diklik
                            textImage.style.display = "flex";
                        });
                        
                        
                        
                        // Menampilkan tombol setelah animasi Typewriter selesai
                        buttonAnimation.style.display = "block";
                        buttonAnimation.style.opacity = "0";
                        buttonAnimation.style.animation = "pudarMasuk 2s forwards";
                    })
                    .start();
            }, 1000);
        })
        .start();
}

function startTypewriterText() {
    const typewriter = new Typewriter('.text', {
        loop: false,
        delay: 75,
    });
    
    typewriter
        .typeString('Ini kenangan kita pada saat masih smp')
        .callFunction(() => {
            // Menunda kemunculan tombol selama 1 detik setelah animasi selesai
            setTimeout(() => {
                
              const textImageButton = document.querySelector('.text-image button');
              
                textImageButton.style.display = 'block';
                textImageButton.style.opacity = '0';
                textImageButton.style.animation = 'pudarMasuk 2s forwards';
              
            }, 1000);
        })
        .start();
}

// Ambil tombol dan gambar anak panah dari DOM
const button = document.querySelector('.text-image button');
const arrow = document.querySelector('.arrow');
const textImageLanjut = document.querySelector('.text-image-lanjut');

// Sembunyikan gambar anak panah secara default
arrow.style.display = 'none';

textImageLanjut.style.display = 'none';

// Tambahkan event listener untuk klik pada tombol
button.addEventListener('click', function() {
    // Tampilkan gambar anak panah setelah tombol diklik
    
    button.style.display = 'none';
    textImageLanjut.style.display = 'flex';
    arrow.style.display = 'block';
    arrow.style.opacity = '0';
    arrow.style.animation = 'pudarMasuk 2s forwards';

});

// Ambil elemen text-lanjut dan image-container-lanjut dari DOM
const textImageLanjutButton = document.querySelector('.text-image-lanjut button');
const textLanjut = document.querySelector('.text-lanjut');
const imageContainerLanjut = document.querySelector('.image-container-lanjut');


// Sembunyikan elemen text-lanjut secara default
textLanjut.style.display = 'none';

// Tambahkan event listener untuk deteksi akhir animasi pada image-container-lanjut
imageContainerLanjut.addEventListener('animationend', function() {
    // Tampilkan elemen text-lanjut setelah animasi pada image-container-lanjut selesai
    textLanjut.style.display = 'block';
    
    startTypewriterAnimationTextLanjut();
    
    });

function startTypewriterAnimationTextLanjut(){
    // Inisialisasi animasi ketik Typewriter pada text-lanjut
    typewriter = new Typewriter('.text-lanjut', {
        loop: false,
        delay: 75,
    });
    
    // Ketikkan teks setelah animasi pada image-container-lanjut selesai
    typewriter
    .typeString('Ini kamu yang paling manis☺')
    .callFunction(() => {
        textImageLanjutButton.style.display = 'block';
        textImageLanjutButton.style.opacity = '0';
        textImageLanjutButton.style.animation = 'pudarMasuk 2s forwards';
    })
    .start();
}

// Ambil tombol dan gambar anak panah dari DOM
const arrowLanjut = document.querySelector('.arrow-lanjut');
const textImageEnd = document.querySelector('.text-image-end');

// Sembunyikan gambar anak panah secara default
arrowLanjut.style.display = 'none';

textImageEnd.style.display = 'none';

// Tambahkan event listener untuk klik pada tombol
textImageLanjutButton.addEventListener('click', function() {
    // Tampilkan gambar anak panah setelah tombol diklik
    arrowLanjut.style.display = 'block';
    textImageLanjutButton.style.display = 'none';
    textImageEnd.style.display = 'flex';

});

const textEnd = document.querySelector('.text-end');
const imageContainerEnd = document.querySelector('.image-container-end');
const buttonEnd = document.querySelector('.text-image-end button');
buttonEnd.style.display = 'none';

// Tambahkan event listener untuk deteksi akhir animasi pada image-container-lanjut
imageContainerEnd.addEventListener('animationend', function() {
    // Tampilkan elemen text-lanjut setelah animasi pada image-container-lanjut selesai
    textEnd.style.display = 'block';
    
    startTypewriterAnimationTextEnd();
    
    });
    
function startTypewriterAnimationTextEnd(){
    // Inisialisasi animasi ketik Typewriter pada text-lanjut
    typewriter = new Typewriter('.text-end', {
        loop: false,
        delay: 75,
    });
    
    // Ketikkan teks setelah animasi pada image-container-lanjut selesai
    typewriter
    .typeString('dan ini foto yang membuatku terpesona😉😋')
    .callFunction(() => {
        buttonEnd.style.display = 'block';
        buttonEnd.addEventListener('click', function(){
            const textImage = document.querySelector('.text-image');
            textImage.style.animation = 'fadeOut 2s ease-out forwards';
            textImageLanjut.style.animation = 'fadeOut 2s ease-out forwards';
            textImageEnd.style.animation = 'fadeOut 2s ease-out forwards';
            textImage.addEventListener('animationend', function() {
                textImage.style.display = 'none';
                textImageLanjut.style.display = 'none';
                textImageEnd.style.display = 'none';
                window.location = "kado/index.html";

            });
        });
    })
    .start();
}

