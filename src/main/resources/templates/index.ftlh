<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory</title>
    <link rel="stylesheet" href="/static/css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div id="app">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="header-left">
                    <div class="logo">
                        <i class="fas fa-users"></i>
                        <div>
                            <h1>Employee <span class="highlight">Directory</span></h1>
                            <p>Manage your company's workforce with style</p>
                        </div>
                    </div>
                </div>
                
                <div class="header-stats">
                    <div class="stat-item">
                        <i class="fas fa-users"></i>
                        <div>
                            <span class="stat-label">Total</span>
                            <span class="stat-value" id="total-employees">15</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-building"></i>
                        <div>
                            <span class="stat-label">Departments</span>
                            <span class="stat-value" id="total-departments">7</span>
                        </div>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-briefcase"></i>
                        <div>
                            <span class="stat-label">Roles</span>
                            <span class="stat-value" id="total-roles">10</span>
                        </div>
                    </div>
                </div>
                
                <button class="btn-primary" id="add-employee-btn">
                    <i class="fas fa-plus"></i>
                    Add Employee
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <!-- Controls -->
            <div class="controls-section">
                <div class="search-container">
                    <i class="fas fa-search"></i>
                    <input type="text" id="search-input" placeholder="Search employees by name or email..." />
                </div>
                
                <div class="controls-right">
                    <div class="sort-container">
                        <select id="sort-field">
                            <option value="firstName">First Name</option>
                            <option value="lastName">Last Name</option>
                            <option value="department">Department</option>
                            <option value="role">Role</option>
                            <option value="hiredDate">Hired Date</option>
                        </select>
                        <button id="sort-order" class="sort-btn" data-order="asc">
                            <i class="fas fa-sort-amount-up"></i>
                            Ascending
                        </button>
                    </div>
                    
                    <button class="filters-btn" id="filters-btn">
                        <i class="fas fa-filter"></i>
                        Filters
                    </button>
                </div>
            </div>

            <!-- Filter Panel -->
            <div class="filter-panel" id="filter-panel" style="display: none;">
                <div class="filter-content">
                    <h3>Filter Employees</h3>
                    <div class="filter-row">
                        <div class="filter-group">
                            <label for="filter-name">Name</label>
                            <input type="text" id="filter-name" placeholder="Search by name...">
                        </div>
                        <div class="filter-group">
                            <label for="filter-department">Department</label>
                            <select id="filter-department">
                                <option value="">All Departments</option>
                            </select>
                        </div>
                        <div class="filter-group">
                            <label for="filter-role">Role</label>
                            <select id="filter-role">
                                <option value="">All Roles</option>
                            </select>
                        </div>
                    </div>
                    <div class="filter-actions">
                        <button class="btn-secondary" id="clear-filters">Clear Filters</button>
                        <button class="btn-primary" id="apply-filters">Apply Filters</button>
                    </div>
                </div>
            </div>

            <!-- Results Section -->
            <div class="results-section">
                <div class="results-header">
                    <div class="results-info">
                        <i class="fas fa-users"></i>
                        <span>Employees Found</span>
                        <span class="results-count" id="results-count">15</span>
                    </div>
                    
                    <div class="view-controls">
                        <button class="view-btn active" data-view="grid" id="grid-view-btn">
                            <i class="fas fa-th"></i>
                            Grid View
                        </button>
                        <button class="view-btn" data-view="list" id="list-view-btn">
                            <i class="fas fa-list"></i>
                            List View
                        </button>
                    </div>
                </div>

                <!-- Employee List -->
                <div class="employee-container" id="employee-container">
                    <#list employees as employee>
                        <div class="employee-card" data-employee-id="${employee.id}">
                            <div class="card-header gradient-${employee.id % 3 + 1}">
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
                                        ${employee.firstName?substring(0, 1)}${employee.lastName?substring(0, 1)}
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
                    </#list>
                </div>

                <!-- Pagination -->
                <div class="pagination-section">
                    <div class="pagination-info">
                        <select id="items-per-page">
                            <option value="9">9 per page</option>
                            <option value="18">18 per page</option>
                            <option value="27">27 per page</option>
                            <option value="36">36 per page</option>
                        </select>
                    </div>
                    
                    <div class="pagination-controls" id="pagination-controls">
                        <button class="pagination-btn" id="prev-page" disabled>
                            <i class="fas fa-chevron-left"></i>
                            Previous
                        </button>
                        <div class="page-numbers" id="page-numbers"></div>
                        <button class="pagination-btn" id="next-page">
                            Next
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Employee Form Modal -->
        <div class="modal" id="employee-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 id="modal-title">Add Employee</h2>
                    <button class="close-btn" id="close-modal">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <form id="employee-form" class="employee-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required>
                            <span class="error-message" id="firstName-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required>
                            <span class="error-message" id="lastName-error"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                        <span class="error-message" id="email-error"></span>
                    </div>
                    
                    <div class="form-group">
                        <label for="phone">Phone *</label>
                        <input type="tel" id="phone" name="phone" required>
                        <span class="error-message" id="phone-error"></span>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="department">Department *</label>
                            <select id="department" name="department" required>
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="HR">HR</option>
                                <option value="Sales">Sales</option>
                                <option value="Design">Design</option>
                                <option value="Operations">Operations</option>
                            </select>
                            <span class="error-message" id="department-error"></span>
                        </div>
                        <div class="form-group">
                            <label for="role">Role *</label>
                            <select id="role" name="role" required>
                                <option value="">Select Role</option>
                                <option value="Frontend Developer">Frontend Developer</option>
                                <option value="Backend Developer">Backend Developer</option>
                                <option value="Full Stack Developer">Full Stack Developer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Designer">Designer</option>
                                <option value="Marketing Manager">Marketing Manager</option>
                                <option value="Content Strategist">Content Strategist</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Financial Analyst">Financial Analyst</option>
                                <option value="HR Manager">HR Manager</option>
                                <option value="Recruiter">Recruiter</option>
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="Sales Representative">Sales Representative</option>
                                <option value="Operations Manager">Operations Manager</option>
                            </select>
                            <span class="error-message" id="role-error"></span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="hiredDate">Hired Date *</label>
                        <input type="date" id="hiredDate" name="hiredDate" required>
                        <span class="error-message" id="hiredDate-error"></span>
                    </div>
                    
                    <div class="form-actions">
                        <button type="button" class="btn-secondary" id="cancel-btn">Cancel</button>
                        <button type="submit" class="btn-primary" id="save-btn">Save Employee</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>