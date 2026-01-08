// QRIS Styles and HTML Template
const cS = `
body{margin:0}.qris-cepat-wrapper-v11,.qris-cepat-wrapper-v11 *{box-sizing:border-box}.qris-cepat-wrapper-v11{margin:0}.qris-cepat-wrapper-v11 .cepat-form-container{display:none;background-color:#ffffff;border-radius:14px;box-shadow:0 3px 16px rgba(0, 0, 0, 0.08);border:1px solid #e6e6e6;transition:all 0.3s ease;padding:20px}.qris-cepat-wrapper-v11 .depo-tabs{display:flex;gap:8px;margin-bottom:14px;background-color:#000000;padding:6px 6px;border-radius:10px;border:1px solid #e6e6e6;position:relative}.qris-cepat-wrapper-v11 .tab{flex:1;padding:8px 8px;cursor:pointer;color:#fff;font-weight:600;text-align:center;border-radius:8px;transition:all .3s ease;display:flex;align-items:center;justify-content:center;gap:4px;font-size:.8rem;border:none;background-color:#2d3436;position:relative;overflow:visible;transition:all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)}.qris-cepat-wrapper-v11 .tab.active{background-color:#00a2b1;color:#fff;box-shadow:0 3px 8px rgba(0, 162, 177, 0.3);transform: translateY(-1px)}.qris-cepat-wrapper-v11 .tab[data-target="qris2"].active{background-color:#00a2b1;box-shadow:0 3px 8px rgba(0, 162, 177, 0.3);transform: translateY(-1px)}.qris-cepat-wrapper-v11 .tab img{height:14px;filter:invert(1)}.qris-cepat-wrapper-v11 .tab[data-target="qris"]::after{content:'CEPAT';position:absolute;top:-6px;right:-5px;background:linear-gradient(135deg, #00a2b1, #00c9d9);color:#fff;padding:2px 6px;font-size:.5rem;font-weight:700;border-radius:15px;box-shadow:0 1px 4px rgba(0, 162, 177, 0.4);z-index:2;text-transform:uppercase;letter-spacing:0.3px;font-weight:700;animation:pulse 1.5s infinite ease-in-out}.qris-cepat-wrapper-v11 .tab[data-target="qris2"]::after{content:'MANUAL';position:absolute;top:-6px;right:-5px;background:linear-gradient(135deg, #ff6b81, #ff8fa3);color:#fff;padding:2px 6px;font-size:.5rem;font-weight:700;border-radius:15px;box-shadow:0 1px 4px rgba(255, 107, 129, 0.4);z-index:2;text-transform:uppercase;letter-spacing:0.3px;font-weight:700;animation:pulse 1.5s infinite ease-in-out}.qris-cepat-wrapper-v11 .form-group{margin-bottom:10px;opacity:1;transition:opacity 0.3s ease}.qris2-form-container .form-group{margin-bottom:8px}.qris-cepat-wrapper-v11 label{display:block;font-weight:600;margin-bottom:.3rem;color:#555;text-transform:none;font-size:.85rem;transition:color 0.3s ease}.qris-cepat-wrapper-v11 .form-control{height:38px!important;width:100%;padding:.5rem 1rem;font-size:.85rem;color:#333;background-color:#fff;border:1px solid #ddd;border-radius:10px;transition:all .3s ease;box-shadow:0 2px 4px rgba(0,0,0,0.02)}.qris-cepat-wrapper-v11 .form-control::placeholder{color:#aaa;opacity:0.8}.form-control:disabled{background-color:#f8f8f8;opacity:.8}.form-control.is-invalid{border-color:#d9534f!important;animation:shake .6s;box-shadow:0 0 0 3px rgba(217, 83, 79, 0.2)}.qris-validation-message{align-items:center;gap:8px;padding:10px 12px;background-color:#fff5f5;border:1px solid #ffd6d6;border-radius:8px;color:#c62828;font-size:.8rem;font-weight:500;margin-top:8px;display:none;box-shadow:0 2px 8px rgba(0,0,0,0.05);transition:all 0.3s ease}.qris-validation-message::before{font-family:"Font Awesome 6 Free";content:"\\\\f06a";font-weight:900;display:inline-block;margin-right:8px}.payment-method-box{background-color:#f8f9fa;border-radius:14px;padding:22px 16px;text-align:center;margin-bottom:22px;box-shadow:0 2px 10px rgba(0, 0, 0, 0.05);transition:all 0.3s ease}.payment-method-box img,.payment-method-box svg{display:inline-block;margin:0 auto;max-height:65px;width:auto;max-width:170px;opacity:.9;transition:all .3s ease}.payment-method-box svg{fill:#00a2b1}.payment-method-box:hover img,.payment-method-box:hover svg{opacity:1;transform:scale(1.05)}.quick-amount-selector{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:7px;padding-bottom:7px;scrollbar-width:thin;scrollbar-color:#00a2b1 #e0e0e0;margin:7px 0}.quick-amount-btn{flex-shrink:0;padding:6px 12px;background-color:#f5f5f5;border:2px solid #eee;color:#666;border-radius:10px;cursor:pointer;transition:all .3s ease;text-align:center;font-weight:600;font-size:.75rem;box-shadow:0 2px 6px rgba(0,0,0,0.05);position:relative;overflow:hidden}.quick-amount-btn::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(0,162,177,0.2),transparent);transition:all 0.5s}.quick-amount-btn:hover::before{left:100%}.quick-amount-btn:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.1)}.quick-amount-btn.active{border-color:#00a2b1;background-color:#fff;color:#00a2b1;box-shadow:0 0 0 3px rgba(0, 162, 177, 0.25);transform:scale(1.05)}.input-group-promo{display:flex;align-items:stretch;position:relative;box-shadow:0 2px 8px rgba(0,0,0,0.05);border-radius:10px;overflow:hidden}.input-group-promo .input-group-text,.input-group-promo .form-control,.input-group-promo .clear-input-btn{height:38px!important}.input-group-promo .input-group-text{display:flex;align-items:center;padding:.5rem .9rem;font-weight:600;color:#666;background-color:#f8f9fa;border:1px solid #ddd;border-radius:10px 0 0 10px;border-right:0}.input-group-promo .form-control{border-radius:0 10px 10px 0!important;flex:1 1 auto;width:1%;min-width:0;position:static;top:-9px;background-color:#fff}.clear-input-btn{position:absolute;right:8px;top:0;font-size:1.2rem;color:#999;cursor:pointer;display:none;line-height:38px;padding:0 4px}.clear-input-btn:hover{color:#00a2b1}.selected-promo-info{color:#333;background-color:#f8f9fa;padding:8px 12px;border-radius:8px;margin-top:8px;font-size:.8rem;font-weight:500;display:none;line-height:1.6;border-left:4px solid #00a2b1;transition:all 0.3s ease}.unique-code-info{display:none;margin-top:8px;padding:10px 12px;background-color:#f9f9f9;border-radius:8px;font-size:.85rem;color:#666;box-shadow:0 2px 6px rgba(0,0,0,0.03);border-left:3px solid #00a2b1}.unique-code-info strong[style*="#d9534f"]{color:#e53935!important}.unique-code-info strong[style*="#00a2b1"]{color:#00a2b1!important}.qris2-form-container .qris2-button{background-color:#00a2b1;width:100%;margin:0;display:block;box-shadow:0 3px 10px rgba(0, 162, 177, 0.3)}.qris2-form-container .qris2-button:hover{background-color:#008fa1;transform: translateY(-1px); box-shadow: 0 5px 14px rgba(0, 162, 177, 0.4)}.cepat-button{width:100%;padding:8px;border:none;border-radius:10px;color:#fff;font-size:.9rem;font-weight:700;cursor:pointer;margin-top:10px;background-color:#00a2b1;transition:all .3s ease;display:flex;align-items:center;justify-content:center;gap:5px;box-shadow:0 3px 10px rgba(0, 162, 177, 0.3);position:relative;overflow:hidden}.cepat-button::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);transition:all 0.5s}.cepat-button:hover::before{left:100%}.cepat-button:hover{transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0, 162, 177, 0.4);}.qris2-form-container .qris-validation-message{margin-top:5px}.result-container,.expired-container,.success-container{display:flex;flex-direction:column;align-items:center;text-align:center;padding:18px;animation:fadeIn 0.5s ease}.barcode-display{margin:4px auto;width:100%;max-width:250px;display:block}.barcode-display canvas,.barcode-display img{max-width:250px!important;height:auto!important;margin:0 auto 5px;display:block;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);transition:all 0.3s ease}#qris2-barcode-container{margin-bottom:15px;min-height:200px;min-width:250px;display:block;margin:0 auto 10px auto;text-align:center}.final-amount{font-size:1.6rem;color:#00a2b1;font-weight:700;display:block;margin:2px 0;transition:all 0.3s ease}.timer-container,.merchant-info{font-size:.9rem;color:#666;margin-bottom:10px}.merchant-info{display:flex!important;align-items:center;justify-content:center;gap:6px;font-size:.85rem;color:#666}.payment-timer{font-weight:700;color:#00a2b1}.expired-container{padding:28px 18px;background-color:#fff5f5;border:2px solid #ffd6d6;border-radius:12px;color:#333;box-shadow:0 4px 16px rgba(217, 83, 79, 0.15)}.buat-ulang-btn,.download-btn{background-color:#00a2b1;color:#fff;padding:10px 16px;border:none;border-radius:8px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:7px;margin-top:8px;transition:all .3s ease, transform .2s ease;box-shadow:0 2px 8px rgba(0, 162, 177, 0.3)}.buat-ulang-btn:hover,.download-btn:hover{background-color:#008fa1;transform: translateY(-1px);box-shadow: 0 4px 12px rgba(0, 162, 177, 0.4)}.success-container{padding:28px 0;background-color:#f0fff4;border-radius:16px;opacity:0;transition:opacity .5s ease;margin-top:18px;color:#333;box-shadow:0 4px 16px rgba(40, 167, 69, 0.15)}.success-container.visible{opacity:1}.success-container p{color:#666;margin-top:8px}.svg-checkmark{width:60px;height:60px;border-radius:50%;display:block;stroke-width:3;stroke:#28a745;stroke-miterlimit:10;margin:0 auto 15px auto;box-shadow:inset 0 0 0 #28a45;animation:fill .4s ease-in-out .4s forwards,scale .3s ease-in-out .9s both}.svg-checkmark__circle{stroke-dasharray:166;stroke-dashoffset:166;stroke-width:3;stroke-miterlimit:10;stroke:#28a745;fill:none;animation:stroke .6s cubic-bezier(.65,0,.45,1) forwards}.svg-checkmark__check{transform-origin:50% 50%;stroke-dasharray:48;stroke-dashoffset:48;stroke:#fff;animation:stroke .3s cubic-bezier(.65,0,.45,1) .8s forwards}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes slideIn{from{transform:translateY(-50px)}to{transform:translateY(0)}}@keyframes blinkPromo{from{opacity:1;transform:scale(1)}to{opacity:.6;transform:scale(.9)}}@keyframes blink-animation{0%,100%{transform:scale(1);opacity:1}30%{transform:scale(.9);opacity:.6}60%{transform:scale(1.15);opacity:1}}@keyframes stroke{100%{stroke-dashoffset:0}}@keyframes scale{0%,100%{transform:none}50%{transform:scale3d(1.1,1.1,1)}}@keyframes fill{100%{box-shadow:inset 0 0 0 40px #28a745}}@keyframes shake{10%,90%{transform:translate3d(-1px,0,0)}20%,80%{transform:translate3d(2px,0,0)}30%,50%,70%{transform:translate3d(-4px,0,0)}40%,60%{transform:translate3d(4px,0,0)}}@keyframes pulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:0.9}}@keyframes float{0%{transform:translateY(0px)}50%{transform:translateY(-8px)}100%{transform:translateY(0px)}}@keyframes gradient{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}@media (max-width:768px){.qris-cepat-wrapper-v11{margin:0}.qris-cepat-wrapper-v11 .cepat-form-container{padding:14px}.qris-cepat-wrapper-v11 .tab{font-size:.9rem;padding:8px 8px;gap:4px}.payment-method-box{padding:14px}.qris-cepat-wrapper-v11 label{font-size:.8rem;margin-bottom:.45rem}.qris-cepat-wrapper-v11 .form-control{height:40px!important;font-size:.85rem}.input-group-promo .input-group-text,.input-group-promo .clear-input-btn{height:40px!important}.quick-amount-btn{padding:7px 12px;font-size:.75rem}.cepat-button{padding:11px;font-size:.9rem;margin-top:18px}.final-amount{font-size:1.8rem}.expired-container,.success-container{padding:26px 16px}.expired-container h3,.success-container h3{font-size:1.1rem}.success-container p{font-size:.85rem}.svg-checkmark{width:55px;height:55px}.qris-form-container .input-group-promo .form-control,.qris2-form-container .input-group-promo .form-control{position:relative;top:-9.5px}}
`;

const quickAmountButtonsHTML = `<button type="button" class="quick-amount-btn" data-amount="25000">25rb</button><button type="button" class="quick-amount-btn" data-amount="50000">50rb</button><button type="button" class="quick-amount-btn" data-amount="75000">75rb</button><button type="button" class="quick-amount-btn" data-amount="100000">100rb</button><button type="button" class="quick-amount-btn" data-amount="200000">200rb</button><button type="button" class="quick-amount-btn" data-amount="250000">250rb</button><button type="button" class="quick-amount-btn" data-amount="500000">500rb</button><button type="button" class="quick-amount-btn" data-amount="1000000">1jt</button><button type="button" class="quick-amount-btn" data-amount="2000000">2jt</button><button type="button" class="quick-amount-btn" data-amount="3000000">3jt</button><button type="button" class="quick-amount-btn" data-amount="4000000">4jt</button><button type="button" class="quick-amount-btn" data-amount="5000000">5jt</button><button type="button" class="quick-amount-btn" data-amount="6000000">6jt</button><button type="button" class="quick-amount-btn" data-amount="7000000">7jt</button><button type="button" class="quick-amount-btn" data-amount="8000000">8jt</button><button type="button" class="quick-amount-btn" data-amount="9000000">9jt</button><button type="button" class="quick-amount-btn" data-amount="10000000">10jt</button>`;

const hM = `
<div class="qris-cepat-wrapper-v11">
    <div class="depo-tabs">
        <button type="button" class="tab" data-target="manual"><i class="fa-solid fa-keyboard"></i> Manual</button>
        <button type="button" class="tab" data-target="qris"><i class="fa-solid fa-qrcode"></i> QRIS</button>
        <button type="button" class="tab" data-target="qris2"><i class="fa-solid fa-credit-card"></i> QRIS 2</button>
    </div>
    <div class="cepat-form-container qris-form-container">
        <div class="cepat-input-area">
            <div class="qris-logo-container">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/QRIS_logo.svg/500px-QRIS_logo.svg.png" alt="QRIS Logo" class="qris-logo">
            </div>
            <div class="form-group">
                <label>Pilih Nominal Cepat</label>
                <div class="quick-amount-selector">${quickAmountButtonsHTML}</div>
            </div>
            <div class="form-group">
                <label for="qris-amount">Atau, Masukkan Jumlah Lain</label>
                <div class="input-group-promo">
                    <span class="input-group-text">Rp</span>
                    <input type="text" id="qris-amount" class="form-control" data-type="qris" placeholder="Contoh: 50.000">
                    <span class="clear-input-btn">&times;</span>
                </div>
                <div class="unique-code-info"></div>
                <div class="qris-validation-message"></div>
            </div>
            <div class="form-group promo-dropdown-container">
                <label for="promo-select">Promosi</label>
                <select id="promo-select" class="form-control">
                    <option value="">Memuat promosi...</option>
                </select>
                <div class="selected-promo-info"></div>
            </div>
            <button type="button" class="cepat-button qris-button">
                <span class="btn-text"><i class="fa-solid fa-qrcode"></i> Buat QRIS</span>
            </button>
        </div>
        <div class="result-container"></div>
    </div>
    <div class="cepat-form-container qris2-form-container">
        <div class="cepat-input-area">
            <div class="form-group">
                <div id="qris2-barcode-container">
                    <i class="fa-solid fa-spinner fa-spin"></i>&nbsp; Memuat barcode... 
                </div>
            </div>
            <div class="form-group">
                <label for="qris2-amount">Nominal Yang Ditransfer</label>
                <div class="input-group-promo">
                    <span class="input-group-text">Rp</span>
                    <input type="text" id="qris2-amount" class="form-control" placeholder="Contoh: 50.000">
                </div>
                <div class="qris-validation-message"></div>
            </div>
            <div class="form-group">
                <label for="qris2-proof">Upload Bukti Transfer (Wajib)</label>
                <input type="file" id="qris2-proof" class="form-control" accept="image/png, image/jpeg, image/jpg" name="receipt">
                <div class="qris-validation-message"></div>
            </div>
            <button type="button" class="cepat-button qris2-button">
                <span class="btn-text"><i class="fa-solid fa-paper-plane"></i> Konfirmasi Pembayaran</span>
            </button>
        </div>
        <div class="result-container"></div>
    </div>
</div>
`;

// Apply styles
if (typeof jQuery !== 'undefined') {
    let l=document.createElement('link');
    l.rel='stylesheet';
    l.href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css';
    document.head.appendChild(l);
    
    $('head').append(`<style>${cS}</style>`);
}