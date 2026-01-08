// Main QRIS functionality
let qT=null;
let bC=null;
let pIR=null;
let accountData=null;

// Functions for handling QRIS display and timers
const sDS=(w,dA)=>{
    if(bC)clearInterval(bC);
    if(qT)clearInterval(qT);
    $.post('/ajax/cma2/allGamqris2Refresh');
    $.get('/ajax/account/getAccountDto',function(r){
        if(r&&typeof r[2]==='number'){
            $('.g8-bal-total').text('IDR '+r[2].toLocaleString('id-ID'));
        }
    });
    let aFS=0;
    const aQD=sessionStorage.getItem('activeQrData');
    const aDD=sessionStorage.getItem('activeDanaData');
    if(aQD){
        aFS=JSON.parse(aQD).amount;
    }else if(aDD){
        aFS=JSON.parse(aDD).amount;
    }
    sessionStorage.removeItem('activeQrData');
    sessionStorage.removeItem('activeDanaData');
    const rC=w.find('.result-container');
    const fA=aFS.toLocaleString('id-ID');
    const sH=`<div class="success-container">
        <svg class="svg-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="svg-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="svg-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h3>Deposit Berhasil!</h3>
        <p>Saldo sebesar <strong>Rp ${fA}</strong> telah ditambahkan ke akun anda.</p>
    </div>`;
    rC.html(sH).show();
    w.find('.cepat-input-area').hide();
    setTimeout(()=>{
        const sC=rC.find('.success-container');
        if(sC.length){
            sC.addClass('visible');
        }
    },10);
};

const sBC=(iB,w)=>{
    if(bC)clearInterval(bC);
    bC=setInterval(()=>{
        $.get('/ajax/account/getAccountDto',function(r){
            if(r&&typeof r[2]==='number'){
                const cB=r[2];
                if(cB>iB){
                    sDS(w,cB);
                }
            }
        }).fail(()=>{
            console.error("Gagal memeriksa saldo akun.");
        });
    },5000);
};

const sQT=(eT,w)=>{
    if(qT)clearInterval(qT);
    const tD=w.find('.payment-timer');
    qT=setInterval(()=>{
        const tLS=Math.round((eT-Date.now())/1000);
        if(tLS<0){
            clearInterval(qT);
            sQE(w);
            return;
        }
        const m=Math.floor(tLS/60);
        let s=tLS%60;
        s=s<10?'0'+s:s;
        tD.text(`${m}:${s}`);
    },1000);
};

const sQE=(w)=>{
    if(bC)clearInterval(bC);
    sessionStorage.removeItem('activeQrData');
    sessionStorage.removeItem('activeDanaData');
    const eH=`<div class="expired-container">
        <h3>Waktu Pembayaran Habis!</h3>
        <button type="button" class="buat-ulang-btn"><i class="fa-solid fa-plus-circle"></i> Buat Deposit Ulang</button>
    </div>`;
    w.find('.result-container').html(eH).show();
};

const dGQ=(d,w)=>{
    const{amount:a,expireTime:e,qrisString:q,initialBalance:i}=d;
    const mN=parseQrisMerchantName(q);
    const qP=generateQrisPayload(q,a.toString());
    const rH=`<div class="timer-container">Waktu Habis Dalam: <span class="payment-timer">-</span></div>
        <div class="merchant-info"><i class="fa-solid fa-shop"></i> Merchant: <strong class="merchant-name">${mN||'Tidak Dikenali'}</strong></div>
        <div class="barcode-display"></div>
        <strong class="final-amount">Rp ${a.toLocaleString('id-ID')}</strong>
        <a href="#" class="download-btn"><i class="fa-solid fa-qrcode"></i> Download QR</a>`;
    const rC=w.find('.result-container');
    rC.html(rH);
    const bD=rC.find('.barcode-display');
    new QRCode(bD[0],{
        text:qP,
        width:250,
        height:250,
        correctLevel:QRCode.CorrectLevel.Q
    });
    w.find('.cepat-input-area').hide();
    rC.show();
    sQT(e,w);
    sBC(i,w);
};

const getAccountData=(callback)=>{
    if(accountData){
        callback(accountData);
        return;
    }
    $.get('/ajax/account/getAccountDto',function(r){
        if(r&&typeof r[4]==='string'&&r[4].length>=3){
            accountData=r;
            callback(r);
        }else{
            callback(null);
        }
    }).fail(()=>{
        callback(null);
    });
};

// Load promotions
async function loadPromotions(formContext){
    const promoSelect=formContext.find('#promo-select');
    const promoContainer=formContext.find('.promo-dropdown-container');
    promoContainer.show();
    try{
        const dcr=await fetch('https://qrisgrd.jasjusweb.workers.dev/api/deposit-config');
        if(!dcr.ok){
            throw new Error('Gagal mengambil konfigurasi deposit.');
        }
        const dc=await dcr.json();
        if(!dc.success){
            promoSelect.empty();
            promoSelect.prop('disabled',true);
            promoSelect.append(`<option value="">${dc.message || "Sistem pembayaran dalam pemeliharaan."}</option>`);
            console.error('Error loading promotions:', dc.message || "Sistem pembayaran dalam pemeliharaan.");
            return;
        }
        // Set unique code length from config
        window.qrisUniqueCodeLength = dc.uniqueCodeLength || 2;

        const bankId=dc.bankId;
        $.ajax({
            url:'/ajax/credit/getDepositPromotion',
            type:'GET',
            dataType:'json',
            data:{bankId:bankId},
            success:function(response){
                promoSelect.empty();
                if(response&&response[0]==='success'&&response[1].length>0){
                    promoSelect.prop('disabled',false);
                    promoSelect.append('<option value="">-- Pilih Promosi --</option>');
                    response[1].forEach(p=>{
                        const promoId=p[0];
                        const promoName=p[1];
                        const optionHtml=`<option value="${promoId}">${promoName}</option>`;
                        promoSelect.append(optionHtml);
                    });
                }else{
                    promoSelect.prop('disabled',true);
                    promoSelect.append('<option value="">Tidak ada promosi yang tersedia</option>');
                }
            },
            error:function(){
                promoSelect.empty();
                promoSelect.prop('disabled',true);
                promoSelect.append('<option value="">Gagal memuat promosi</option>');
            }
        });
    }catch(error){
        promoSelect.empty();
        promoSelect.prop('disabled',true);
        promoSelect.append('<option value="">Gagal mengambil konfigurasi</option>');
        console.error('Error loading promotions:',error);
    }
}

// Main jQuery ready function
jQuery(document).ready(function($){
    if($('.qris-cepat-wrapper-v11').length>0){
        return;
    }
    
    const dF=$('form[action="/ajax/cm/reqDeposit"]');
    
    dF.each(async function(){
        const cF=$(this);
        if(cF.find('.qris-cepat-wrapper-v11').length===0){
            const mFC=cF.children().wrapAll('<div class="manual-form-container-v11"></div>').parent();
            cF.prepend(hM);
            mFC.show();
            cF.find('.tab[data-target=manual]').addClass('active');
            await loadPromotions(cF);
        }
    });
    
    // Event handlers
    $('body').on('change','#promo-select',function(){
        const selectedPromoId=$(this).val();
        const selectedPromoName=$(this).find('option:selected').text();
        const amountInput=$(this).closest('.qris-form-container').find('#qris-amount');
        const promoInfoDiv=$(this).siblings('.selected-promo-info');
        
        amountInput.data('promo-id','').data('min-deposit','');
        promoInfoDiv.hide().html('');
        
        if(selectedPromoId){
            promoInfoDiv.html('<i class="fa-solid fa-spinner fa-spin"></i> Memeriksa info...').show();
            $.ajax({
                url:'/ajax/deposit/getPromotionInfo',
                type:'GET',
                data:{id:selectedPromoId},
                dataType:'json',
                success:function(r){
                    if(r&&r.code==='200'){
                        const{minDepositAmount:minDeposit,turnoverCondition:to,maxBonusAmount:maxBonusRaw}=r;
                        const maxBonus=parseFloat(maxBonusRaw)*1000;
                        amountInput.data('promo-id',selectedPromoId).data('min-deposit',minDeposit);
                        promoInfoDiv.html(`Min. Depo: <strong>${parseFloat(minDeposit).toLocaleString('id-ID')}</strong> | TO: <strong>x${to}</strong> | Max Bonus: <strong>${maxBonus.toLocaleString('id-ID')}</strong>`).show();
                    }else{
                        promoInfoDiv.text('Gagal memuat detail promo.').show();
                    }
                },
                error:function(){
                    promoInfoDiv.text('Error saat mengambil info promo.').show();
                }
            });
        }
    });
    
    $('body').on('click','.qris-cepat-wrapper-v11 .tab',function(){
        const cT=$(this);
        const t=cT.data('target');
        const w=cT.closest('.qris-cepat-wrapper-v11');
        if(cT.hasClass('active'))return;
        
        w.find('.tab').removeClass('active');
        cT.addClass('active');
        
        const pF=cT.closest('form');
        const manualForm=pF.find('.manual-form-container-v11');
        const qrisForm=w.find('.qris-form-container');
        const qris2Form=w.find('.qris2-form-container');
        
        manualForm.hide();
        qrisForm.hide();
        qris2Form.hide();
        
        if(t==='manual'){
            manualForm.show();
        }else if(t==='qris'){
            qrisForm.show();
            const aQD=sessionStorage.getItem('activeQrData');
            if(aQD&&Date.now()<JSON.parse(aQD).expireTime){
                const qD=JSON.parse(aQD);
                if(qD.qrisString&&typeof qD.initialBalance==='number'){
                    dGQ(qD,qrisForm);
                }
            }else{
                sessionStorage.removeItem('activeQrData');
                qrisForm.find('.cepat-input-area').show();
                qrisForm.find('.result-container').empty();
            }
        }else if(t==='qris2'){
            qris2Form.show();
            const barcodeContainer=w.find('#qris2-barcode-container');
            if(barcodeContainer.find('img').length===0){
                // Load QRIS2 barcode here
                barcodeContainer.html('<i class="fa-solid fa-spinner fa-spin"></i>&nbsp; Memuat barcode...');
                $.post('/ajax/cm/reqDepositQris2',function(r){
                    if(r&&r[0]==='success'&&r[1]){
                        const qris2Data=r[1];
                        barcodeContainer.empty();
                        new QRCode(barcodeContainer[0],{
                            text:qris2Data,
                            width:200,
                            height:200,
                            correctLevel:QRCode.CorrectLevel.Q
                        });
                    }else{
                        barcodeContainer.html('Gagal memuat QRIS2');
                    }
                }).fail(function(){
                    barcodeContainer.html('Error saat memuat QRIS2');
                });
            }
        }
    });
    
    // Amount input handling
    $('body').on('input','#qris-amount',function(){
        let value=$(this).val().replace(/\D/g, '');
        if(value!==''){
            value=parseInt(value).toLocaleString('id-ID');
            $(this).val(value);
        }
        
        // Calculate unique code
        const uniqueCode = Math.floor(Math.random() * Math.pow(10, window.qrisUniqueCodeLength || 2));
        const amount = parseInt($(this).val().replace(/\./g, '')) || 0;
        const totalAmount = amount + uniqueCode;
        
        const uniqueInfoDiv = $(this).siblings('.unique-code-info');
        if(amount > 0){
            uniqueInfoDiv.html(`Termasuk kode unik: <strong style="color:#d9534f">+${uniqueCode}</strong>, Jumlah akhir: <strong style="color:#00a2b1">${totalAmount.toLocaleString('id-ID')}</strong>`).show();
        } else {
            uniqueInfoDiv.hide();
        }
    });
    
    // Clear input button
    $('body').on('focus', '#qris-amount', function() {
        $(this).siblings('.clear-input-btn').show();
    });
    
    $('body').on('blur', '#qris-amount', function() {
        setTimeout(() => {
            $(this).siblings('.clear-input-btn').hide();
        }, 150);
    });
    
    $('body').on('click', '.clear-input-btn', function() {
        $(this).siblings('#qris-amount').val('').trigger('input');
        $(this).hide();
    });
    
    // Quick amount buttons
    $('body').on('click', '.quick-amount-btn', function() {
        const amount = $(this).data('amount');
        $(this).closest('.qris-form-container').find('#qris-amount').val(amount.toLocaleString('id-ID')).trigger('input');
        $(this).closest('.quick-amount-selector').find('.quick-amount-btn').removeClass('active');
        $(this).addClass('active');
    });
    
    // QRIS button click handler
    $('body').on('click', '.qris-button', async function() {
        const btn = $(this);
        const container = btn.closest('.qris-form-container');
        const amountInput = container.find('#qris-amount');
        const promoSelect = container.find('#promo-select');
        const validationMsg = container.find('.qris-validation-message');
        
        const amountStr = amountInput.val().replace(/\./g, '');
        const amount = parseInt(amountStr);
        const promoId = promoSelect.val();
        
        // Validation
        if(!amount || amount <= 0){
            validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Silakan masukkan jumlah deposit').show();
            amountInput.focus();
            return;
        }
        
        // Check min deposit if promo is selected
        if(promoId) {
            const minDeposit = parseFloat(amountInput.data('min-deposit')) || 0;
            if(amount < minDeposit) {
                validationMsg.html(`<i class="fa-solid fa-exclamation-circle"></i> Jumlah deposit minimal untuk promo ini adalah ${minDeposit.toLocaleString('id-ID')}`).show();
                amountInput.focus();
                return;
            }
        }
        
        validationMsg.hide();
        
        // Add loading state
        btn.prop('disabled', true);
        btn.find('.btn-text').html('<i class="fa-solid fa-spinner fa-spin"></i> Memproses...');
        
        try {
            // Get account data
            const account = await new Promise((resolve) => {
                getAccountData(resolve);
            });
            
            if(!account) {
                validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Gagal mengambil data akun. Silakan coba lagi').show();
                return;
            }
            
            // Calculate unique code
            const uniqueCode = Math.floor(Math.random() * Math.pow(10, window.qrisUniqueCodeLength || 2));
            const finalAmount = amount + uniqueCode;
            
            // Make request to create QRIS
            $.post('/ajax/cm/reqDepositQris', {
                amount: finalAmount,
                bankId: promoId || 0
            }, function(r) {
                if(r && r[0] === 'success' && r[1]) {
                    const qrisData = r[1];
                    qrisData.amount = finalAmount;
                    qrisData.initialBalance = account[2];
                    dGQ(qrisData, container);
                    
                    // Store in session for persistence
                    sessionStorage.setItem('activeQrData', JSON.stringify(qrisData));
                } else {
                    validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Gagal membuat QRIS. Silakan coba lagi').show();
                }
            }).fail(function() {
                validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Terjadi kesalahan saat membuat QRIS').show();
            });
        } catch (error) {
            validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Terjadi kesalahan. Silakan coba lagi').show();
        } finally {
            btn.prop('disabled', false);
            btn.find('.btn-text').html('<i class="fa-solid fa-qrcode"></i> Buat QRIS');
        }
    });
    
    // QRIS2 form handling
    $('body').on('click', '.qris2-button', async function() {
        const btn = $(this);
        const container = btn.closest('.qris2-form-container');
        const amountInput = container.find('#qris2-amount');
        const proofInput = container.find('#qris2-proof');
        const validationMsg = container.find('.qris-validation-message');
        
        const amountStr = amountInput.val().replace(/\./g, '');
        const amount = parseInt(amountStr);
        const proofFile = proofInput[0].files[0];
        
        // Validation
        if(!amount || amount <= 0){
            validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Silakan masukkan jumlah transfer').show();
            amountInput.focus();
            return;
        }
        
        if(!proofFile){
            validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Silakan upload bukti transfer').show();
            proofInput.focus();
            return;
        }
        
        validationMsg.hide();
        
        // Add loading state
        btn.prop('disabled', true);
        btn.find('.btn-text').html('<i class="fa-solid fa-spinner fa-spin"></i> Mengunggah...');
        
        try {
            // Compress image if needed
            const processedFile = await compressImage(proofFile);
            
            // Create form data
            const formData = new FormData();
            formData.append('amount', amount);
            formData.append('receipt', processedFile);
            
            // Upload with AJAX
            $.ajax({
                url: '/ajax/cm/reqDepositQris2Confirm',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function(r) {
                    if(r && r[0] === 'success') {
                        // Show success message
                        const rC = container.find('.result-container');
                        const fA = amount.toLocaleString('id-ID');
                        const sH = `<div class="success-container">
                            <svg class="svg-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle class="svg-checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                <path class="svg-checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                            </svg>
                            <h3>Konfirmasi Berhasil!</h3>
                            <p>Permintaan deposit sebesar <strong>Rp ${fA}</strong> telah dikirimkan. Silakan tunggu konfirmasi dari admin.</p>
                        </div>`;
                        rC.html(sH).show();
                        container.find('.cepat-input-area').hide();
                        setTimeout(()=>{
                            const sC=rC.find('.success-container');
                            if(sC.length){
                                sC.addClass('visible');
                            }
                        },10);
                    } else {
                        validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Gagal mengkonfirmasi pembayaran. Silakan coba lagi').show();
                    }
                },
                error: function() {
                    validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Terjadi kesalahan saat mengunggah bukti').show();
                },
                complete: function() {
                    btn.prop('disabled', false);
                    btn.find('.btn-text').html('<i class="fa-solid fa-paper-plane"></i> Konfirmasi Pembayaran');
                }
            });
        } catch (error) {
            validationMsg.html('<i class="fa-solid fa-exclamation-circle"></i> Gagal memproses gambar. Silakan coba lagi').show();
            btn.prop('disabled', false);
            btn.find('.btn-text').html('<i class="fa-solid fa-paper-plane"></i> Konfirmasi Pembayaran');
        }
    });
    
    // Download QR button
    $('body').on('click', '.download-btn', function(e) {
        e.preventDefault();
        const canvas = $(this).siblings('.barcode-display').find('canvas')[0];
        if(canvas) {
            const link = document.createElement('a');
            link.download = 'qris-code.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }
    });
    
    // Re-create button
    $('body').on('click', '.buat-ulang-btn', function() {
        const container = $(this).closest('.qris-form-container');
        container.find('.result-container').empty();
        container.find('.cepat-input-area').show();
    });
});