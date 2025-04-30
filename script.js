// Create Dummy Notices
const notices = [];
for (let i = 1; i <= 35; i++) {
  notices.push({
    date: '23-01-2025',
    type: 'Notice',
    title: `Notice Title ${i}`,
    action: 'View'
  });
}

let currentPage = 1;
let entriesPerPage = 10;

// Update and render table
function updateTable() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const entriesSelect = document.getElementById('entriesCount');
  entriesPerPage = parseInt(entriesSelect.value);

  let filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchInput)
  );

  const start = (currentPage - 1) * entriesPerPage;
  const end = start + entriesPerPage;
  const paginatedNotices = filteredNotices.slice(start, end);

  const tableBody = document.getElementById('noticeBody');
  tableBody.innerHTML = '';

  paginatedNotices.forEach(notice => {
    const row = `<tr>
      <td>${notice.date}</td>
      <td>${notice.type}</td>
      <td>${notice.title}</td>
      <td><a href="#">${notice.action}</a></td>
    </tr>`;
    tableBody.innerHTML += row;
  });

  renderPageInfo(filteredNotices.length);
}

// Show page info
function renderPageInfo(totalItems) {
  const pageInfo = document.getElementById('pageInfo');
  const totalPages = Math.ceil(totalItems / entriesPerPage);
  pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;

  // Disable buttons if needed
  document.querySelector('.pagination button:nth-child(1)').disabled = (currentPage === 1);
  document.querySelector('.pagination button:nth-child(3)').disabled = (currentPage === totalPages || totalPages === 0);
}

// Previous page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
}

// Next page
function nextPage() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  let filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchInput)
  );
  const totalPages = Math.ceil(filteredNotices.length / entriesPerPage);

  if (currentPage < totalPages) {
    currentPage++;
    updateTable();
  }
}

// First load
updateTable();

