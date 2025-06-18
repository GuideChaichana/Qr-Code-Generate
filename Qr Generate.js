let currentQRCodeUrl = '';

        function generateQRCode() {
            const link = document.getElementById('linkInput').value.trim();
            const qrCodeImage = document.getElementById('qrCodeImage');
            const qrCodeContainer = document.getElementById('qr-code-container');

            if (link) {
                // Validate URL
                try {
                    new URL(link);
                } catch {
                    // If not a valid URL, assume it's missing protocol
                    const correctedLink = link.startsWith('http') ? link : 'https://' + link;
                    try {
                        new URL(correctedLink);
                        document.getElementById('linkInput').value = correctedLink;
                    } catch {
                        alert('กรุณาป้อนลิงก์ที่ถูกต้อง');
                        return;
                    }
                }

                // Generate QR Code
                const finalLink = document.getElementById('linkInput').value;
                const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(finalLink)}`;
                
                currentQRCodeUrl = apiUrl;
                qrCodeImage.src = apiUrl;
                
                // Show QR code container with animation
                qrCodeContainer.classList.remove('hidden');
                qrCodeContainer.style.opacity = '0';
                qrCodeContainer.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    qrCodeContainer.style.transition = 'all 0.3s ease';
                    qrCodeContainer.style.opacity = '1';
                    qrCodeContainer.style.transform = 'translateY(0)';
                }, 10);
                
            } else {
                alert('กรุณาป้อนลิงก์ก่อนสร้าง QR Code');
                qrCodeContainer.classList.add('hidden');
            }
        }

        function downloadQRCode() {
            if (currentQRCodeUrl) {
                const link = document.createElement('a');
                link.href = currentQRCodeUrl;
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

        // Enter key support
        document.getElementById('linkInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateQRCode();
            }
        });

        // Auto-focus on input
        window.addEventListener('load', function() {
            document.getElementById('linkInput').focus();
        });