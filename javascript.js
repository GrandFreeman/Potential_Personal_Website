        const students = [
            {
                id: 1,
                studentId: "u11104006",
                name: "",
                date: "2025-12-24",
                links: [
                    { url: "https://chilin2tb-stack.github.io/U11104006_final/index.html", label: "作品網站" }
                ],
                type: "github",
                late: false,
                featured: true
            },
            {
                id: 2,
                studentId: "u11104022",
                name: "",
                date: "2025-12-24",
                links: [
                    { url: "https://z72123.github.io/U11104022-Final-Project-Report/#home", label: "作品網站" },
                    { url: "https://github.com/z72123/U11104022-Final-Project-Report", label: "GitHub Repository" },
                    { url: "https://gemini.google.com/share/13729133804c", label: "Gemini分享" },
                    { url: "https://github.com/oceanicdayi/2025_Geophysics_Final_Report/blob/main/%E5%8F%B2%E5%9C%B0%E7%94%9F%E7%94%A8_Python_%E8%AE%80%E6%87%82%E5%9C%B0%E7%90%83%E6%96%B0%E8%AA%9E%E8%A8%80.m4a", label: "🎧 語音摘要 (NotebookLM)" }
                ],
                type: "github",
                late: false,
                special: ["gemini"],
                featured: true
            },
            {
                id: 3,
                studentId: "u11210021",
                name: "黃冠維",
                date: "2025-12-24",
                links: [
                    { url: "https://samuel10727.github.io/2025termreport-01/", label: "作品網站" }
                ],
                type: "github",
                late: false
            },
            {
                id: 4,
                studentId: "u11310002",
                name: "陳亞歆",
                date: "2025-12-24",
                links: [
                    { url: "https://yaxin06.github.io/2025_term_report_geophysics_new/", label: "作品網站" },
                    { url: "https://github.com/yaxin06/2025_term_report_geophysics_new", label: "GitHub Repository" }
                ],
                type: "github",
                late: false
            }

        ];

        let currentFilter = 'all';
        let searchTerm = '';

        function renderCards() {
            const grid = document.getElementById('cardsGrid');
            let filteredStudents = students.filter(student => {
                // 搜索過濾
                const matchSearch = student.name.includes(searchTerm) || 
                                  student.studentId.includes(searchTerm);
                
                // 類型過濾
                let matchFilter = true;
                if (currentFilter === 'github') {
                    matchFilter = student.type === 'github';
                } else if (currentFilter === 'gemini') {
                    matchFilter = student.type === 'gemini';
                } else if (currentFilter === 'special') {
                    matchFilter = student.type === 'streamlit' || student.special;
                }

                return matchSearch && matchFilter;
            });

            document.getElementById('visibleCount').textContent = filteredStudents.length;

            if (filteredStudents.length === 0) {
                grid.innerHTML = '<div class="no-results">😔 沒有找到符合條件的作業</div>';
                return;
            }

            grid.innerHTML = filteredStudents.map(student => {
                let tags = [];
                if (student.featured) tags.push('<span class="tag featured">⭐ 特別推薦</span>');
                if (student.type === 'github') tags.push('<span class="tag github">GitHub Pages</span>');
                if (student.type === 'gemini') tags.push('<span class="tag gemini">Gemini</span>');
                if (student.type === 'streamlit') tags.push('<span class="tag streamlit">Streamlit</span>');
                if (student.special?.includes('colab')) tags.push('<span class="tag colab">Colab</span>');

                return `
                    <div class="card ${student.featured ? 'featured-item' : ''}" id="student-${student.id}">
                        <div class="card-header">
                            <div class="student-info">
                                <h3>${student.name}</h3>
                                <div class="student-id">${student.studentId}</div>
                            </div>
                            <div class="card-number">${student.id}</div>
                        </div>
                        <div class="submit-date">${student.date}</div>
                        <div class="tags">
                            ${tags.join('')}
                        </div>
                        <div class="links">
                            ${student.links.map(link => 
                                `<a href="${link.url}" target="_blank" class="link-btn">${link.label}</a>`
                            ).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }

        // 搜索功能
        document.getElementById('searchInput').addEventListener('input', (e) => {
            searchTerm = e.target.value.trim();
            renderCards();
        });

        // 過濾按鈕
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderCards();
            });
        });

        // 滚动到指定学生卡片
        function scrollToStudent(id) {
            renderCards();
            setTimeout(() => {
                const element = document.getElementById(`student-${id}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.style.animation = 'pulse 1s ease-in-out 2';
                }
            }, 100);
        }

        // 初始渲染
        renderCards();
