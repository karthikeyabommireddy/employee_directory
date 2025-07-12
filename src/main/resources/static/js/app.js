class EmployeeDirectory {
    constructor() {
        // Load employees from localStorage if available, else use mockEmployees
        const stored = localStorage.getItem('employees');
        this.employees = stored ? JSON.parse(stored) : [...mockEmployees];
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.itemsPerPage = 9;
        this.currentView = 'grid';
        this.currentSort = { field: 'firstName', order: 'asc' };
        this.currentFilters = { name: '', department: '', role: '' };
        this.editingEmployeeId = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.populateFilterOptions();
        this.setView('grid'); // Set default view
        this.renderEmployees();
        this.updateStats();
        this.updatePagination();
    }
    
    setupEventListeners() {
        // Search
        document.getElementById('search-input').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
        
        // Sort
        document.getElementById('sort-field').addEventListener('change', (e) => {
            this.currentSort.field = e.target.value;
            this.applySortAndFilter();
        });
        
        document.getElementById('sort-order').addEventListener('click', () => {
            this.toggleSortOrder();
        });
        
        // Filters
        document.getElementById('filters-btn').addEventListener('click', () => {
            this.toggleFilterPanel();
        });
        
        document.getElementById('apply-filters').addEventListener('click', () => {
            this.applyFilters();
        });
        
        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });
        
        // View toggle
        document.getElementById('grid-view-btn').addEventListener('click', () => {
            this.setView('grid');
        });
        
        document.getElementById('list-view-btn').addEventListener('click', () => {
            this.setView('list');
        });
        
        // Pagination
        document.getElementById('items-per-page').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployees();
            this.updatePagination();
        });
        
        document.getElementById('prev-page').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderEmployees();
                this.updatePagination();
            }
        });
        
        document.getElementById('next-page').addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderEmployees();
                this.updatePagination();
            }
        });
        
        // Modal
        document.getElementById('add-employee-btn').addEventListener('click', () => {
            this.openModal();
        });
        
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('employee-form').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });
        
        // Click outside modal to close
        document.getElementById('employee-modal').addEventListener('click', (e) => {
            if (e.target.id === 'employee-modal') {
                this.closeModal();
            }
        });
    }
    
    populateFilterOptions() {
        const departmentSelect = document.getElementById('filter-department');
        const roleSelect = document.getElementById('filter-role');
        
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept;
            option.textContent = dept;
            departmentSelect.appendChild(option);
        });
        
        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.textContent = role;
            roleSelect.appendChild(option);
        });
    }
    
    handleSearch(query) {
        this.currentFilters.name = query;
        this.applySortAndFilter();
    }
    
    toggleSortOrder() {
        const button = document.getElementById('sort-order');
        const icon = button.querySelector('i');
        
        if (this.currentSort.order === 'asc') {
            this.currentSort.order = 'desc';
            icon.className = 'fas fa-sort-amount-down';
            button.innerHTML = '<i class="fas fa-sort-amount-down"></i> Descending';
        } else {
            this.currentSort.order = 'asc';
            icon.className = 'fas fa-sort-amount-up';
            button.innerHTML = '<i class="fas fa-sort-amount-up"></i> Ascending';
        }
        
        this.applySortAndFilter();
    }
    
    toggleFilterPanel() {
        const panel = document.getElementById('filter-panel');
        const isActive = panel.classList.contains('active');
        
        if (isActive) {
            panel.classList.remove('active');
            // Hide with animation
            panel.style.display = 'none';
        } else {
            panel.classList.add('active');
            // Show with animation
            panel.style.display = 'block';
        }
    }
    
    applyFilters() {
        const nameFilter = document.getElementById('filter-name').value;
        const departmentFilter = document.getElementById('filter-department').value;
        const roleFilter = document.getElementById('filter-role').value;
        
        this.currentFilters = {
            name: nameFilter,
            department: departmentFilter,
            role: roleFilter
        };
        
        this.applySortAndFilter();
        this.toggleFilterPanel();
    }
    
    clearFilters() {
        document.getElementById('filter-name').value = '';
        document.getElementById('filter-department').value = '';
        document.getElementById('filter-role').value = '';
        document.getElementById('search-input').value = '';
        
        this.currentFilters = { name: '', department: '', role: '' };
        this.applySortAndFilter();
        this.toggleFilterPanel();
    }
    
    applySortAndFilter() {
        let filtered = [...this.employees];
        
        // Apply filters
        if (this.currentFilters.name) {
            const query = this.currentFilters.name.toLowerCase();
            filtered = filtered.filter(emp => 
                emp.firstName.toLowerCase().includes(query) ||
                emp.lastName.toLowerCase().includes(query) ||
                emp.email.toLowerCase().includes(query)
            );
        }
        
        if (this.currentFilters.department) {
            filtered = filtered.filter(emp => emp.department === this.currentFilters.department);
        }
        
        if (this.currentFilters.role) {
            filtered = filtered.filter(emp => emp.role === this.currentFilters.role);
        }
        
        // Apply sorting
        filtered.sort((a, b) => {
            let valueA = a[this.currentSort.field];
            let valueB = b[this.currentSort.field];
            
            if (typeof valueA === 'string') {
                valueA = valueA.toLowerCase();
                valueB = valueB.toLowerCase();
            }
            
            if (this.currentSort.order === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
            }
        });
        
        this.filteredEmployees = filtered;
        this.currentPage = 1;
        this.renderEmployees();
        this.updatePagination();
        this.updateResultsCount();
    }
    
    setView(view) {
        this.currentView = view;
        const gridBtn = document.getElementById('grid-view-btn');
        const listBtn = document.getElementById('list-view-btn');
        const container = document.getElementById('employee-container');
        
        if (view === 'grid') {
            gridBtn.classList.add('active');
            listBtn.classList.remove('active');
            container.classList.remove('list-view');
        } else {
            listBtn.classList.add('active');
            gridBtn.classList.remove('active');
            container.classList.add('list-view');
        }
        
        // Re-render employees when switching views
        this.renderEmployees();
    }
    
    renderEmployees() {
        const container = document.getElementById('employee-container');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageEmployees = this.filteredEmployees.slice(startIndex, endIndex);
        
        // Clear existing content
        container.innerHTML = '';
        
        if (this.currentView === 'list') {
            container.innerHTML = this.createListView(pageEmployees);
        } else {
            container.innerHTML = pageEmployees.map(emp => this.createEmployeeCard(emp)).join('');
        }
        
        // Add event listeners to edit and delete buttons
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        const container = document.getElementById('employee-container');
        
        // Add fresh event listeners
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                // Fix: Pass the employee object to openModal for editing
                const employee = this.employees.find(emp => emp.id === id);
                if (employee) {
                    this.openModal(employee);
                }
            });
        });
        
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                this.deleteEmployee(id);
            });
        });
    }
    
    createEmployeeCard(employee) {
        const initials = employee.firstName.charAt(0) + employee.lastName.charAt(0);
        const gradientClass = `gradient-${employee.id % 3 + 1}`;
        
        return `
            <div class="employee-card" data-employee-id="${employee.id}">
                <div class="card-header ${gradientClass}">
                    <div class="card-actions">
                        <button class="action-btn edit-btn" data-id="${employee.id}" title="Edit Employee">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${employee.id}" title="Delete Employee">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <div class="avatar-container">
                        <div class="avatar">
                            ${initials}
                        </div>
                        <div class="status-indicator"></div>
                    </div>
                </div>
                
                <div class="card-content">
                    <h3 class="employee-name">${employee.firstName} ${employee.lastName}</h3>
                    <p class="employee-id">ID: ${employee.id}</p>
                    
                    <div class="employee-info">
                        <div class="info-item">
                            <i class="fas fa-envelope"></i>
                            <div>
                                <span class="info-label">Email</span>
                                <span class="info-value">${employee.email}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-phone"></i>
                            <div>
                                <span class="info-label">Phone</span>
                                <span class="info-value">${employee.phone}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-building"></i>
                            <div>
                                <span class="info-label">Department</span>
                                <span class="info-value">${employee.department}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-briefcase"></i>
                            <div>
                                <span class="info-label">Role</span>
                                <span class="info-value">${employee.role}</span>
                            </div>
                        </div>
                        
                        <div class="info-item">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <span class="info-label">Hired</span>
                                <span class="info-value">${employee.hiredDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    createListView(employees) {
        return `
            <table class="list-view-table">
                <thead>
                    <tr>
                        <th><i class="fas fa-star"></i> Employee</th>
                        <th><i class="fas fa-envelope"></i> Contact</th>
                        <th><i class="fas fa-building"></i> Department</th>
                        <th><i class="fas fa-user-tie"></i> Role</th>
                        <th><i class="fas fa-calendar"></i> Hire Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${employees.map(emp => this.createListRow(emp)).join('')}
                </tbody>
            </table>
        `;
    }
    
    createListRow(employee) {
        const initials = employee.firstName.charAt(0) + employee.lastName.charAt(0);
        const gradientClass = `gradient-${employee.id % 3 + 1}`;
        
        return `
            <tr data-employee-id="${employee.id}">
                <td>
                    <div class="employee-cell">
                        <div class="list-avatar ${gradientClass}">
                            ${initials}
                        </div>
                        <div class="employee-info-list">
                            <div class="employee-name-list">${employee.firstName} ${employee.lastName}</div>
                            <div class="employee-id-list">ID: ${employee.id}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="contact-info">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            ${employee.email}
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            ${employee.phone}
                        </div>
                    </div>
                </td>
                <td>
                    <div class="department-badge">
                        <i class="fas fa-building"></i>
                        ${employee.department}
                    </div>
                </td>
                <td>
                    <div class="role-badge">
                        <i class="fas fa-user-tie"></i>
                        ${employee.role}
                    </div>
                </td>
                <td>
                    <div class="hire-date">
                        <i class="fas fa-calendar"></i>
                        ${employee.hiredDate}
                    </div>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn edit-btn" data-id="${employee.id}" title="Edit Employee">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" data-id="${employee.id}" title="Delete Employee">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }
    
    updatePagination() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageNumbers = document.getElementById('page-numbers');
        
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages || totalPages === 0;
        
        // Generate page numbers
        pageNumbers.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                const pageBtn = document.createElement('button');
                pageBtn.className = `page-btn ${i === this.currentPage ? 'active' : ''}`;
                pageBtn.textContent = i;
                pageBtn.addEventListener('click', () => {
                    this.currentPage = i;
                    this.renderEmployees();
                    this.updatePagination();
                });
                pageNumbers.appendChild(pageBtn);
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'page-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
        }
    }
    
    updateStats() {
        const totalEmployees = this.employees.length;
        const uniqueDepartments = new Set(this.employees.map(emp => emp.department)).size;
        const uniqueRoles = new Set(this.employees.map(emp => emp.role)).size;
        
        document.getElementById('total-employees').textContent = totalEmployees;
        document.getElementById('total-departments').textContent = uniqueDepartments;
        document.getElementById('total-roles').textContent = uniqueRoles;
    }
    
    updateResultsCount() {
        document.getElementById('results-count').textContent = this.filteredEmployees.length;
    }
    
    openModal(employee = null) {
        const modal = document.getElementById('employee-modal');
        const title = document.getElementById('modal-title');
        const form = document.getElementById('employee-form');
        
        if (employee) {
            title.textContent = 'Edit Employee';
            this.editingEmployeeId = employee.id;
            this.populateForm(employee);
        } else {
            title.textContent = 'Add Employee';
            this.editingEmployeeId = null;
            form.reset();
            this.clearFormErrors();
        }
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('employee-modal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.editingEmployeeId = null;
        this.clearFormErrors();
    }
    
    populateForm(employee) {
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('phone').value = employee.phone;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        
        // Convert hired date to YYYY-MM-DD format
        const dateParts = employee.hiredDate.split(' ');
        const month = this.getMonthNumber(dateParts[0]);
        const day = dateParts[1].replace(',', '').padStart(2, '0');
        const year = dateParts[2];
        document.getElementById('hiredDate').value = `${year}-${month}-${day}`;
    }
    
    getMonthNumber(monthName) {
        const months = {
            'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
            'May': '05', 'Jun': '06', 'Jul': '07', 'Aug': '08',
            'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
        };
        return months[monthName] || '01';
    }
    
    handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            const formData = new FormData(e.target);
            const employeeData = {
                firstName: formData.get('firstName').trim(),
                lastName: formData.get('lastName').trim(),
                email: formData.get('email').trim(),
                phone: formData.get('phone').trim(),
                department: formData.get('department'),
                role: formData.get('role'),
                hiredDate: this.formatDate(formData.get('hiredDate'))
            };
            
            if (this.editingEmployeeId) {
                this.updateEmployee(this.editingEmployeeId, employeeData);
            } else {
                this.addEmployee(employeeData);
            }
            
            this.closeModal();
        }
    }
    
    validateForm() {
        const fields = ['firstName', 'lastName', 'email', 'phone', 'department', 'role', 'hiredDate'];
        let isValid = true;
        
        this.clearFormErrors();
        
        fields.forEach(field => {
            const input = document.getElementById(field);
            const errorElement = document.getElementById(`${field}-error`);
            
            if (!input.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else if (field === 'email' && !this.isValidEmail(input.value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            } else if (field === 'phone' && !this.isValidPhone(input.value)) {
                this.showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        });
        
        // Check for duplicate email
        const email = document.getElementById('email').value.trim();
        const existingEmployee = this.employees.find(emp => 
            emp.email.toLowerCase() === email.toLowerCase() && 
            emp.id !== this.editingEmployeeId
        );
        
        if (existingEmployee) {
            this.showFieldError('email', 'This email address is already in use');
            isValid = false;
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    showFieldError(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}-error`);
        
        input.classList.add('error');
        errorElement.textContent = message;
    }
    
    clearFormErrors() {
        const inputs = document.querySelectorAll('.form-group input, .form-group select');
        const errors = document.querySelectorAll('.error-message');
        
        inputs.forEach(input => input.classList.remove('error'));
        errors.forEach(error => error.textContent = '');
    }
    
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    addEmployee(employeeData) {
        const newEmployee = {
            id: Math.max(...this.employees.map(emp => emp.id)) + 1,
            ...employeeData
        };
        this.employees.push(newEmployee);
        this.saveEmployeesToLocalStorage();
        this.applySortAndFilter();
        this.updateStats();
    }
    
    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = { id, ...employeeData };
            this.saveEmployeesToLocalStorage();
            this.applySortAndFilter();
        }
    }
    
    deleteEmployee(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.saveEmployeesToLocalStorage();
            this.applySortAndFilter();
            this.updateStats();
        }
    }
    
    saveEmployeesToLocalStorage() {
        localStorage.setItem('employees', JSON.stringify(this.employees));
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmployeeDirectory();
});