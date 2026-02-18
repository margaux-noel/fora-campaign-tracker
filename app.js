// =====================
// CAMPAIGN TRACKER - Fora Travel Partners
// =====================

// --- Sample Data ---
const SAMPLE_CAMPAIGNS = [
    {
        id: '1',
        name: 'Spring Newsletter Feature',
        partner: 'Hotel Chapter Roma',
        type: 'Newsletter',
        status: 'Completed',
        startDate: '2025-03-01',
        endDate: '2025-03-15',
        impressions: 12400,
        clicks: 890,
        bookings: 14,
        revenue: 42000,
        notes: 'Featured in the March advisor newsletter. Strong click-through rate.'
    },
    {
        id: '2',
        name: 'Instagram Takeover Weekend',
        partner: 'Hotel Chapter Roma',
        type: 'Social Media',
        status: 'Completed',
        startDate: '2025-04-18',
        endDate: '2025-04-20',
        impressions: 34500,
        clicks: 2100,
        bookings: 8,
        revenue: 24000,
        notes: 'Property takeover of Fora Instagram stories. Great engagement.'
    },
    {
        id: '3',
        name: 'Advisor Webinar: Rome Luxury',
        partner: 'Hotel Chapter Roma',
        type: 'Webinar',
        status: 'Completed',
        startDate: '2025-06-10',
        endDate: '2025-06-10',
        impressions: 450,
        clicks: 0,
        bookings: 6,
        revenue: 18000,
        notes: '45-min webinar with GM. 87 advisors attended live.'
    },
    {
        id: '4',
        name: 'Summer Email Blast',
        partner: 'Aman Tokyo',
        type: 'Email',
        status: 'Completed',
        startDate: '2025-05-20',
        endDate: '2025-05-25',
        impressions: 8200,
        clicks: 620,
        bookings: 5,
        revenue: 37500,
        notes: 'Targeted email to top Japan-selling advisors.'
    },
    {
        id: '5',
        name: 'Fora Forum Sponsorship',
        partner: 'Aman Tokyo',
        type: 'Event',
        status: 'Completed',
        startDate: '2025-09-15',
        endDate: '2025-09-17',
        impressions: 600,
        clicks: 0,
        bookings: 12,
        revenue: 90000,
        notes: 'Sponsored the welcome dinner at Fora Forum NYC.'
    },
    {
        id: '6',
        name: 'Valentine\'s Co-branded Guide',
        partner: 'Rosewood London',
        type: 'Co-branded',
        status: 'Completed',
        startDate: '2025-01-20',
        endDate: '2025-02-14',
        impressions: 15600,
        clicks: 1340,
        bookings: 11,
        revenue: 55000,
        notes: 'Romantic getaway guide co-created with Rosewood marketing team.'
    },
    {
        id: '7',
        name: 'Q1 Newsletter Spotlight',
        partner: 'Rosewood London',
        type: 'Newsletter',
        status: 'Completed',
        startDate: '2025-01-05',
        endDate: '2025-01-12',
        impressions: 11800,
        clicks: 760,
        bookings: 7,
        revenue: 35000,
        notes: ''
    },
    {
        id: '8',
        name: 'Spring Social Campaign',
        partner: 'The Brando',
        type: 'Social Media',
        status: 'Live',
        startDate: '2026-02-01',
        endDate: '2026-03-15',
        impressions: 8900,
        clicks: 430,
        bookings: 2,
        revenue: 28000,
        notes: 'Ongoing Instagram + Pinterest campaign for peak season.'
    },
    {
        id: '9',
        name: 'Advisor FAM Trip Promo',
        partner: 'The Brando',
        type: 'Email',
        status: 'Live',
        startDate: '2026-02-10',
        endDate: '2026-02-28',
        impressions: 3200,
        clicks: 280,
        bookings: 0,
        revenue: 0,
        notes: 'Promoting upcoming FAM trip to top-tier advisors.'
    },
    {
        id: '10',
        name: 'Earth Day Partnership',
        partner: 'The Brando',
        type: 'Co-branded',
        status: 'Planned',
        startDate: '2026-04-15',
        endDate: '2026-04-30',
        impressions: 0,
        clicks: 0,
        bookings: 0,
        revenue: 0,
        notes: 'Sustainability-focused content around Earth Day. Draft in review.'
    },
    {
        id: '11',
        name: 'Summer Bora Bora Push',
        partner: 'Four Seasons Bora Bora',
        type: 'Email',
        status: 'Planned',
        startDate: '2026-04-01',
        endDate: '2026-04-15',
        impressions: 0,
        clicks: 0,
        bookings: 0,
        revenue: 0,
        notes: 'Targeted email for honeymoon and anniversary planners.'
    },
    {
        id: '12',
        name: 'Overwater Villa Webinar',
        partner: 'Four Seasons Bora Bora',
        type: 'Webinar',
        status: 'Planned',
        startDate: '2026-05-08',
        endDate: '2026-05-08',
        impressions: 0,
        clicks: 0,
        bookings: 0,
        revenue: 0,
        notes: 'Virtual tour with resort GM. Targeting 100+ attendees.'
    },
    {
        id: '13',
        name: 'March Advisor Newsletter',
        partner: 'Hotel Chapter Roma',
        type: 'Newsletter',
        status: 'Live',
        startDate: '2026-02-25',
        endDate: '2026-03-10',
        impressions: 1200,
        clicks: 95,
        bookings: 0,
        revenue: 0,
        notes: 'New room category feature for spring season.'
    }
];

// --- State ---
let campaigns = [];
let currentView = 'table';
let calendarDate = new Date();
let editingId = null;

// --- Init ---
function init() {
    loadCampaigns();
    bindEvents();
    render();
}

// --- Data Layer (localStorage) ---
function loadCampaigns() {
    const stored = localStorage.getItem('fora_campaigns');
    if (stored) {
        campaigns = JSON.parse(stored);
    } else {
        campaigns = SAMPLE_CAMPAIGNS;
        saveCampaigns();
    }
}

function saveCampaigns() {
    localStorage.setItem('fora_campaigns', JSON.stringify(campaigns));
}

function getNextId() {
    const maxId = campaigns.reduce((max, c) => Math.max(max, parseInt(c.id)), 0);
    return String(maxId + 1);
}

// --- Filtering ---
function getFilteredCampaigns() {
    const partnerFilter = document.getElementById('filterPartner').value;
    const typeFilter = document.getElementById('filterType').value;
    const statusFilter = document.getElementById('filterStatus').value;

    return campaigns.filter(c => {
        if (partnerFilter && c.partner !== partnerFilter) return false;
        if (typeFilter && c.type !== typeFilter) return false;
        if (statusFilter && c.status !== statusFilter) return false;
        return true;
    });
}

// --- Render Everything ---
function render() {
    renderStats();
    renderPartnerFilter();
    renderTable();
    renderCalendar();
    renderPartnerView();
}

// --- Stats Bar ---
function renderStats() {
    const all = campaigns;
    const total = all.length;
    const active = all.filter(c => c.status === 'Live').length;
    const completed = all.filter(c => c.status === 'Completed').length;
    const revenue = all.reduce((sum, c) => sum + (c.revenue || 0), 0);

    document.getElementById('statTotal').textContent = total;
    document.getElementById('statActive').textContent = active;
    document.getElementById('statCompleted').textContent = completed;
    document.getElementById('statRevenue').textContent = '$' + revenue.toLocaleString();
}

// --- Partner Filter Dropdown ---
function renderPartnerFilter() {
    const select = document.getElementById('filterPartner');
    const currentValue = select.value;
    const partners = [...new Set(campaigns.map(c => c.partner))].sort();

    // Keep the first "All" option, replace the rest
    select.innerHTML = '<option value="">All Partners</option>';
    partners.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        if (p === currentValue) opt.selected = true;
        select.appendChild(opt);
    });
}

// --- Table View ---
function renderTable() {
    const filtered = getFilteredCampaigns();
    const tbody = document.getElementById('campaignTableBody');
    const emptyState = document.getElementById('emptyTable');

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';

    // Sort: Live first, then Planned, then Completed. Within each group, by start date
    const statusOrder = { 'Live': 0, 'Planned': 1, 'Completed': 2 };
    const sorted = [...filtered].sort((a, b) => {
        const statusDiff = statusOrder[a.status] - statusOrder[b.status];
        if (statusDiff !== 0) return statusDiff;
        return new Date(a.startDate) - new Date(b.startDate);
    });

    tbody.innerHTML = sorted.map(c => `
        <tr data-id="${c.id}">
            <td>
                <div class="campaign-name-cell">${escapeHtml(c.name)}</div>
                ${c.notes ? `<div class="campaign-notes-preview">${escapeHtml(c.notes)}</div>` : ''}
            </td>
            <td>${escapeHtml(c.partner)}</td>
            <td><span class="type-badge">${escapeHtml(c.type)}</span></td>
            <td class="campaign-dates">
                <span class="date-range">${formatDate(c.startDate)} &ndash; ${formatDate(c.endDate)}</span>
            </td>
            <td><span class="status-badge ${c.status.toLowerCase()}">${c.status}</span></td>
            <td class="metric-cell ${!c.impressions ? 'empty' : ''}">${c.impressions ? c.impressions.toLocaleString() : '—'}</td>
            <td class="metric-cell ${!c.clicks ? 'empty' : ''}">${c.clicks ? c.clicks.toLocaleString() : '—'}</td>
            <td class="metric-cell ${!c.bookings ? 'empty' : ''}">${c.bookings ? c.bookings.toLocaleString() : '—'}</td>
            <td class="metric-cell ${!c.revenue ? 'empty' : ''}">${c.revenue ? '$' + c.revenue.toLocaleString() : '—'}</td>
            <td>
                <div class="row-actions">
                    <button class="btn-row edit" title="Edit" onclick="openEditModal('${c.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-row delete" title="Delete" onclick="deleteCampaign('${c.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// --- Calendar View ---
function renderCalendar() {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();

    // Update label
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('calMonthLabel').textContent = `${monthNames[month]} ${year}`;

    // Build calendar cells
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

    const filtered = getFilteredCampaigns();

    let cells = '';

    // Previous month's trailing days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        cells += `<div class="cal-day other-month"><div class="cal-day-number">${day}</div></div>`;
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const isToday = isCurrentMonth && day === today.getDate();

        // Find campaigns active on this day
        const dayCampaigns = filtered.filter(c => dateStr >= c.startDate && dateStr <= c.endDate);

        let campaignHtml = '';
        const maxShow = 3;
        dayCampaigns.slice(0, maxShow).forEach(c => {
            campaignHtml += `<div class="cal-campaign ${c.status.toLowerCase()}" onclick="openEditModal('${c.id}')" title="${escapeHtml(c.name)} (${c.partner})">${escapeHtml(c.name)}</div>`;
        });
        if (dayCampaigns.length > maxShow) {
            campaignHtml += `<div class="cal-more">+${dayCampaigns.length - maxShow} more</div>`;
        }

        cells += `<div class="cal-day${isToday ? ' today' : ''}">
            <div class="cal-day-number">${day}</div>
            ${campaignHtml}
        </div>`;
    }

    // Next month's leading days (fill to complete the grid)
    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remaining; i++) {
        cells += `<div class="cal-day other-month"><div class="cal-day-number">${i}</div></div>`;
    }

    document.getElementById('calendarCells').innerHTML = cells;
}

// --- Partner View ---
function renderPartnerView() {
    const filtered = getFilteredCampaigns();
    const grouped = {};

    filtered.forEach(c => {
        if (!grouped[c.partner]) grouped[c.partner] = [];
        grouped[c.partner].push(c);
    });

    const container = document.getElementById('partnerCards');

    if (Object.keys(grouped).length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No campaigns match your filters.</p></div>';
        return;
    }

    // Sort partners alphabetically
    const sortedPartners = Object.keys(grouped).sort();

    container.innerHTML = sortedPartners.map(partner => {
        const partnerCampaigns = grouped[partner];
        const totalRevenue = partnerCampaigns.reduce((sum, c) => sum + (c.revenue || 0), 0);

        // Sort: Live first, Planned, Completed
        const statusOrder = { 'Live': 0, 'Planned': 1, 'Completed': 2 };
        partnerCampaigns.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

        return `
            <div class="partner-group">
                <div class="partner-group-header">
                    <span class="partner-group-name">${escapeHtml(partner)}</span>
                    <div>
                        <span class="partner-group-count">${partnerCampaigns.length} campaign${partnerCampaigns.length !== 1 ? 's' : ''}</span>
                        ${totalRevenue ? `<span class="partner-revenue-total"> &middot; $${totalRevenue.toLocaleString()} revenue</span>` : ''}
                    </div>
                </div>
                <div class="partner-campaign-cards">
                    ${partnerCampaigns.map(c => `
                        <div class="partner-campaign-card" onclick="openEditModal('${c.id}')">
                            <div class="pcc-top">
                                <span class="pcc-name">${escapeHtml(c.name)}</span>
                                <span class="status-badge ${c.status.toLowerCase()}">${c.status}</span>
                            </div>
                            <div class="pcc-dates">
                                <span class="type-badge">${escapeHtml(c.type)}</span>
                                &nbsp; ${formatDate(c.startDate)} &ndash; ${formatDate(c.endDate)}
                            </div>
                            <div class="pcc-results">
                                <div class="pcc-result">
                                    <span class="pcc-result-label">Impr.</span>
                                    <span class="pcc-result-value">${c.impressions ? shortNumber(c.impressions) : '—'}</span>
                                </div>
                                <div class="pcc-result">
                                    <span class="pcc-result-label">Clicks</span>
                                    <span class="pcc-result-value">${c.clicks ? shortNumber(c.clicks) : '—'}</span>
                                </div>
                                <div class="pcc-result">
                                    <span class="pcc-result-label">Bookings</span>
                                    <span class="pcc-result-value">${c.bookings || '—'}</span>
                                </div>
                                <div class="pcc-result">
                                    <span class="pcc-result-label">Revenue</span>
                                    <span class="pcc-result-value">${c.revenue ? '$' + shortNumber(c.revenue) : '—'}</span>
                                </div>
                            </div>
                            ${c.notes ? `<div class="pcc-notes">${escapeHtml(c.notes)}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
}

// --- Modal ---
function openAddModal() {
    editingId = null;
    document.getElementById('modalTitle').textContent = 'New Campaign';
    document.getElementById('campaignForm').reset();
    document.getElementById('campaignId').value = '';
    document.getElementById('modalOverlay').classList.remove('hidden');
}

function openEditModal(id) {
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) return;

    editingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Campaign';
    document.getElementById('campaignId').value = id;
    document.getElementById('campaignName').value = campaign.name;
    document.getElementById('campaignPartner').value = campaign.partner;
    document.getElementById('campaignType').value = campaign.type;
    document.getElementById('campaignStatus').value = campaign.status;
    document.getElementById('campaignStart').value = campaign.startDate;
    document.getElementById('campaignEnd').value = campaign.endDate;
    document.getElementById('campaignImpressions').value = campaign.impressions || '';
    document.getElementById('campaignClicks').value = campaign.clicks || '';
    document.getElementById('campaignBookings').value = campaign.bookings || '';
    document.getElementById('campaignRevenue').value = campaign.revenue || '';
    document.getElementById('campaignNotes').value = campaign.notes || '';

    document.getElementById('modalOverlay').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modalOverlay').classList.add('hidden');
    editingId = null;
}

function saveCampaignFromForm() {
    const campaignData = {
        id: editingId || getNextId(),
        name: document.getElementById('campaignName').value.trim(),
        partner: document.getElementById('campaignPartner').value.trim(),
        type: document.getElementById('campaignType').value,
        status: document.getElementById('campaignStatus').value,
        startDate: document.getElementById('campaignStart').value,
        endDate: document.getElementById('campaignEnd').value,
        impressions: parseInt(document.getElementById('campaignImpressions').value) || 0,
        clicks: parseInt(document.getElementById('campaignClicks').value) || 0,
        bookings: parseInt(document.getElementById('campaignBookings').value) || 0,
        revenue: parseInt(document.getElementById('campaignRevenue').value) || 0,
        notes: document.getElementById('campaignNotes').value.trim()
    };

    if (editingId) {
        const index = campaigns.findIndex(c => c.id === editingId);
        if (index !== -1) campaigns[index] = campaignData;
    } else {
        campaigns.push(campaignData);
    }

    saveCampaigns();
    closeModal();
    render();
}

function deleteCampaign(id) {
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) return;
    if (!confirm(`Delete "${campaign.name}"? This can't be undone.`)) return;

    campaigns = campaigns.filter(c => c.id !== id);
    saveCampaigns();
    render();
}

// --- View Switching ---
function switchView(view) {
    currentView = view;

    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.view === view);
    });

    document.getElementById('viewTable').classList.toggle('hidden', view !== 'table');
    document.getElementById('viewCalendar').classList.toggle('hidden', view !== 'calendar');
    document.getElementById('viewPartner').classList.toggle('hidden', view !== 'partner');

    // Re-render calendar when switching to it (in case of filter changes)
    if (view === 'calendar') renderCalendar();
}

// --- Event Bindings ---
function bindEvents() {
    // Add campaign
    document.getElementById('btnAddCampaign').addEventListener('click', openAddModal);

    // Modal controls
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('btnCancel').addEventListener('click', closeModal);
    document.getElementById('modalOverlay').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    // Form submit
    document.getElementById('campaignForm').addEventListener('submit', function (e) {
        e.preventDefault();
        saveCampaignFromForm();
    });

    // View tabs
    document.querySelectorAll('.view-tab').forEach(tab => {
        tab.addEventListener('click', function () {
            switchView(this.dataset.view);
        });
    });

    // Filters
    ['filterPartner', 'filterType', 'filterStatus'].forEach(id => {
        document.getElementById(id).addEventListener('change', function () {
            renderTable();
            renderCalendar();
            renderPartnerView();
        });
    });

    // Calendar navigation
    document.getElementById('calPrev').addEventListener('click', function () {
        calendarDate.setMonth(calendarDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('calNext').addEventListener('click', function () {
        calendarDate.setMonth(calendarDate.getMonth() + 1);
        renderCalendar();
    });

    document.getElementById('calToday').addEventListener('click', function () {
        calendarDate = new Date();
        renderCalendar();
    });

    // Keyboard shortcut: Escape to close modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
}

// --- Helpers ---
function formatDate(dateStr) {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
}

function shortNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'K';
    return n.toString();
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// --- Start ---
init();
