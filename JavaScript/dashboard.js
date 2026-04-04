const Dashboard = (function() {
    let currentUser = null;
    let users = JSON.parse(localStorage.getItem('craftsmen_users')) || [];
    let orders = JSON.parse(localStorage.getItem('craftsmen_orders')) || [];

    function getLocalizedName(item, field = 'name') {
        const lang = I18n.currentLang();
        if (lang === 'ar') return item[`${field}_ar`] || item[`${field}_en`];
        if (lang === 'fr') return item[`${field}_fr`] || item[`${field}_en`] || item[`${field}_ar`];
        return item[`${field}_en`] || item[`${field}_ar`];
    }
    
    function formatDate(dateString) {
        const date = new Date(dateString);
        const lang = I18n.currentLang();
        return date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : (lang === 'fr' ? 'fr-FR' : 'en-US'));
    }

    function init() {
        currentUser = Auth.currentUser();
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }
        if (currentUser.userType === 'worker') {
            window.location.href = 'worker-dashboard.html';
            return;
        }
        
        document.getElementById('welcomeMessage').innerHTML = `${I18n.getText('hello')}، ${currentUser.firstName} ${currentUser.lastName}`;
        document.getElementById('currentDate').innerHTML = new Date().toLocaleDateString(I18n.currentLang() === 'ar' ? 'ar-EG' : (I18n.currentLang() === 'fr' ? 'fr-FR' : 'en-US'), { year: 'numeric', month: 'long', day: 'numeric' });
        
        const myOrders = orders.filter(o => o.email === currentUser.email);
        document.getElementById('ordersCount').innerText = myOrders.length;
        const ordersList = document.getElementById('ordersList');
        
        if (myOrders.length === 0) {
            ordersList.innerHTML = `<div class="empty-state"><i class="fas fa-inbox"></i><p>${I18n.getText('no_orders')}</p><button class="btn btn-outline" onclick="window.location.href='request.html'">${I18n.getText('new_request')}</button></div>`;
        } else {
            ordersList.innerHTML = myOrders.map(order => {
                const spec = window.SPECIALTIES_DATA.find(s => s.id == order.specialty);
                const specName = spec ? getLocalizedName(spec) : order.specialty;
                const statusText = order.status === 'accepted' ? I18n.getText('accepted') : (order.status === 'rejected' ? I18n.getText('rejected') : I18n.getText('pending'));
                const statusClass = order.status === 'accepted' ? 'success' : (order.status === 'rejected' ? 'error' : 'pending');
                return `<li class="order-item"><div><strong>${specName}</strong><br><small>${order.governorate} - ${order.district}</small><br><span class="status-${statusClass}">${statusText}</span></div><div class="order-actions"><button type="button" class="btn btn-outline btn-sm" onclick="window.location.href='request.html?specialty=${order.specialty}'"><i class="fas fa-redo"></i> ${I18n.getText('reorder')}</button></div></li>`;
            }).join('');
        }
        
        document.getElementById('editFname').value = currentUser.firstName;
        document.getElementById('editLname').value = currentUser.lastName;
        document.getElementById('editEmail').value = currentUser.email;
        document.getElementById('editPhone').value = currentUser.phone?.replace('+20', '') || '';
        document.getElementById('editBirthDate').value = currentUser.birthDate || '';
        document.getElementById('editAddress').value = currentUser.address || '';
        
        document.getElementById('editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].firstName = document.getElementById('editFname').value.trim();
                users[userIndex].lastName = document.getElementById('editLname').value.trim();
                users[userIndex].phone = '+20' + document.getElementById('editPhone').value.trim();
                users[userIndex].birthDate = document.getElementById('editBirthDate').value;
                users[userIndex].address = document.getElementById('editAddress').value.trim();
                const newPass = document.getElementById('editPassword').value.trim();
                if (newPass) users[userIndex].password = newPass;
                localStorage.setItem('craftsmen_users', JSON.stringify(users));
                const sessionUser = { ...users[userIndex] };
                delete sessionUser.password;
                currentUser = sessionUser;
                localStorage.setItem('craftsmen_session', JSON.stringify(currentUser));
                document.getElementById('profileUpdateMsg').innerHTML = '<i class="fas fa-check-circle"></i> ' + I18n.getText('profile_updated');
                document.getElementById('profileUpdateMsg').style.display = 'block';
                setTimeout(() => document.getElementById('profileUpdateMsg').style.display = 'none', 3000);
                Auth.updateAuthUI();
            }
        });
        
        document.getElementById('deleteAccountBtn')?.addEventListener('click', () => {
            if (confirm(I18n.getText('confirm_delete'))) {
                users = users.filter(u => u.email !== currentUser.email);
                localStorage.setItem('craftsmen_users', JSON.stringify(users));
                Auth.logout();
                window.location.href = 'index.html';
            }
        });
        
        const sections = ['requests', 'profile', 'settings'];
        document.querySelectorAll('.sidebar a[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                sections.forEach(s => {
                    const el = document.getElementById(`${s}Section`);
                    if (el) el.style.display = s === section ? 'block' : 'none';
                });
                document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        document.getElementById('logoutSidebar')?.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });
        
        const toggleEdit = document.getElementById('toggleEditPassword');
        if (toggleEdit) {
            toggleEdit.addEventListener('click', () => {
                const inp = document.getElementById('editPassword');
                if (inp.type === 'password') {
                    inp.type = 'text';
                    toggleEdit.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    inp.type = 'password';
                    toggleEdit.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        }
        
        Animations.initDashboard();
    }

    function initWorker() {
        currentUser = Auth.currentUser();
        if (!currentUser) {
            window.location.href = 'login.html';
            return;
        }
        if (currentUser.userType !== 'worker') {
            window.location.href = 'dashboard.html';
            return;
        }
        
        document.getElementById('welcomeMessage').innerHTML = `${I18n.getText('hello')}، ${currentUser.firstName} ${currentUser.lastName}`;
        document.getElementById('currentDate').innerHTML = new Date().toLocaleDateString(I18n.currentLang() === 'ar' ? 'ar-EG' : (I18n.currentLang() === 'fr' ? 'fr-FR' : 'en-US'), { year: 'numeric', month: 'long', day: 'numeric' });
        
        let pendingOrders = orders.filter(o => o.specialty == currentUser.specialty && o.status === 'pending');
        const container = document.getElementById('workerRequestsList');
        document.getElementById('requestsCount').innerText = pendingOrders.length;
        
        if (pendingOrders.length === 0) {
            container.innerHTML = `<div class="empty-state"><i class="fas fa-inbox"></i><p>${I18n.getText('no_worker_requests')}</p></div>`;
        } else {
            container.innerHTML = pendingOrders.map(order => {
                const spec = window.SPECIALTIES_DATA.find(s => s.id == order.specialty);
                const specName = spec ? getLocalizedName(spec) : '';
                return `<div class="request-card">
                    <h3><i class="fas fa-user-circle"></i> ${order.name}</h3>
                    <p><strong>${I18n.getText('service')}:</strong> ${specName}</p>
                    <p><strong>${I18n.getText('governorate')}:</strong> ${order.governorate} - ${order.district}</p>
                    <p><strong>${I18n.getText('address')}:</strong> ${order.address}</p>
                    <p><strong>${I18n.getText('description')}:</strong> ${order.problemDesc}</p>
                    <p><strong>${I18n.getText('client_phone')}:</strong> ${order.phone}</p>
                    <div class="request-actions">
                        <button class="accept-btn" data-id="${order.id}">${I18n.getText('accept')}</button>
                        <button class="reject-btn" data-id="${order.id}">${I18n.getText('reject')}</button>
                    </div>
                </div>`;
            }).join('');
            
            document.querySelectorAll('.accept-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const orderIndex = orders.findIndex(o => o.id == btn.dataset.id);
                    if (orderIndex !== -1) {
                        orders[orderIndex].status = 'accepted';
                        localStorage.setItem('craftsmen_orders', JSON.stringify(orders));
                        Auth.showNotification(I18n.getText('request_accepted'));
                        initWorker();
                    }
                });
            });
            
            document.querySelectorAll('.reject-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const orderIndex = orders.findIndex(o => o.id == btn.dataset.id);
                    if (orderIndex !== -1) {
                        orders[orderIndex].status = 'rejected';
                        localStorage.setItem('craftsmen_orders', JSON.stringify(orders));
                        Auth.showNotification(I18n.getText('request_rejected'));
                        initWorker();
                    }
                });
            });
        }
        
        document.getElementById('editFname').value = currentUser.firstName;
        document.getElementById('editLname').value = currentUser.lastName;
        document.getElementById('editEmail').value = currentUser.email;
        document.getElementById('editPhone').value = currentUser.phone?.replace('+20', '') || '';
        document.getElementById('editBirthDate').value = currentUser.birthDate || '';
        document.getElementById('editAddress').value = currentUser.address || '';
        
        document.getElementById('editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex].firstName = document.getElementById('editFname').value.trim();
                users[userIndex].lastName = document.getElementById('editLname').value.trim();
                users[userIndex].phone = '+20' + document.getElementById('editPhone').value.trim();
                users[userIndex].birthDate = document.getElementById('editBirthDate').value;
                users[userIndex].address = document.getElementById('editAddress').value.trim();
                const newPass = document.getElementById('editPassword').value.trim();
                if (newPass) users[userIndex].password = newPass;
                localStorage.setItem('craftsmen_users', JSON.stringify(users));
                const sessionUser = { ...users[userIndex] };
                delete sessionUser.password;
                currentUser = sessionUser;
                localStorage.setItem('craftsmen_session', JSON.stringify(currentUser));
                document.getElementById('profileUpdateMsg').innerHTML = '<i class="fas fa-check-circle"></i> ' + I18n.getText('profile_updated');
                document.getElementById('profileUpdateMsg').style.display = 'block';
                setTimeout(() => document.getElementById('profileUpdateMsg').style.display = 'none', 3000);
                Auth.updateAuthUI();
            }
        });
        
        document.getElementById('deleteAccountBtn')?.addEventListener('click', () => {
            if (confirm(I18n.getText('confirm_delete'))) {
                users = users.filter(u => u.email !== currentUser.email);
                localStorage.setItem('craftsmen_users', JSON.stringify(users));
                Auth.logout();
                window.location.href = 'index.html';
            }
        });
        
        const sections = ['requests', 'profile', 'settings'];
        document.querySelectorAll('.sidebar a[data-section]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                sections.forEach(s => {
                    const el = document.getElementById(`${s}Section`);
                    if (el) el.style.display = s === section ? 'block' : 'none';
                });
                document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        document.getElementById('logoutSidebar')?.addEventListener('click', (e) => {
            e.preventDefault();
            Auth.logout();
        });
        
        const toggleEdit = document.getElementById('toggleEditPassword');
        if (toggleEdit) {
            toggleEdit.addEventListener('click', () => {
                const inp = document.getElementById('editPassword');
                if (inp.type === 'password') {
                    inp.type = 'text';
                    toggleEdit.classList.replace('fa-eye', 'fa-eye-slash');
                } else {
                    inp.type = 'password';
                    toggleEdit.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        }
        
        Animations.initDashboard();
    }
    
    return { init, initWorker };
})();
window.Dashboard = Dashboard;