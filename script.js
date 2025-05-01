let blessings = JSON.parse(localStorage.getItem('blessings')) || [];

function updateBlessingList() {
  const listContainer = document.getElementById('blessing-list');
  const countContainer = document.getElementById('blessing-count');

  listContainer.innerHTML = '';
  blessings.forEach((entry, index) => {
    const div = document.createElement('div');
    div.className = 'blessing-entry';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'blessing-name';
    nameSpan.textContent = entry.name;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'ลบ';
    deleteButton.onclick = () => deleteBlessing(index);

    div.appendChild(nameSpan);
    div.appendChild(deleteButton);
    listContainer.appendChild(div);
  });

  countContainer.textContent = `จำนวนผู้ลงนาม: ${blessings.length}`;
}

function submitBlessing(event) {
  event.preventDefault();
  const name = event.target.name.value.trim();
  const message = event.target.message.value.trim();

  if (name && message) {
    const newEntry = { name };
    blessings.push(newEntry);
    localStorage.setItem('blessings', JSON.stringify(blessings));
    updateBlessingList();

    alert(`ขอบคุณคุณ ${name} ที่ร่วมถวายพระพร`);
    event.target.reset();
  } else {
    alert('กรุณากรอกชื่อและข้อความก่อนลงนาม');
  }
}

function deleteBlessing(index) {
  const confirmDelete = confirm(`ต้องการลบชื่อ ${blessings[index].name} หรือไม่?`);
  if (confirmDelete) {
    blessings.splice(index, 1);
    localStorage.setItem('blessings', JSON.stringify(blessings));
    updateBlessingList();
  }
}

// โหลดข้อมูลเมื่อเปิดหน้า
updateBlessingList();