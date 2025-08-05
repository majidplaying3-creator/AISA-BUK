document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const form = document.getElementById('excosApplicationForm');
    const receiptContainer = document.getElementById('applicationReceipt');
    const receiptContent = document.getElementById('receiptContent');
    const printBtn = document.getElementById('printReceipt');
    const newAppBtn = document.getElementById('newApplication');
    const categorySelect = document.getElementById('category');
    const positionSelect = document.getElementById('position');
    const genderSelect = document.getElementById('gender');

    // Position options data
    const positionOptions = {
        'Executive': [
            { value: 'VicePresident', label: 'Vice President', genderRestriction: 'Female' },
            { value: 'Treasurer', label: 'Treasurer' },
            { value: 'PRO', label: 'Public Relations Officer' },
            { value: 'SocialDirector', label: 'Director of Social' },
            { value: 'SportsDirector', label: 'Director of Sports' },
            { value: 'WelfareDirector', label: 'Welfare Director' },
            { value: 'AcademicDirector', label: 'Academic Director' }
        ],
        'Legislative': [
            { value: 'SenatePresident', label: 'Senate President' },
            { value: 'Clerk', label: 'Clerk of the Senate' },
            { value: 'FacultySenator', label: 'Faculty Senator' }
        ],
        'Judiciary': [
            { value: 'ChiefJudge', label: 'Chief Judge' },
            { value: 'JudiciaryMember', label: 'Judiciary Member' }
        ]
    };

    // Update position options based on category and gender
    function updatePositionOptions() {
        const category = categorySelect.value;
        const gender = genderSelect.value;
        
        // Clear existing options
        positionSelect.innerHTML = '<option value="">Select Position</option>';
        
        if (category && positionOptions[category]) {
            positionOptions[category].forEach(position => {
                // Skip if position has gender restriction that doesn't match
                if (position.genderRestriction && position.genderRestriction !== gender) {
                    return;
                }
                
                const option = document.createElement('option');
                option.value = position.value;
                option.textContent = position.label;
                positionSelect.appendChild(option);
            });
        }
    }

    // Event listeners for dynamic form behavior
    categorySelect.addEventListener('change', updatePositionOptions);
    genderSelect.addEventListener('change', updatePositionOptions);

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            gender: genderSelect.value,
            category: categorySelect.value,
            position: positionSelect.options[positionSelect.selectedIndex].text,
            fullName: document.getElementById('fullName').value,
            regNo: document.getElementById('regNo').value,
            areaCouncil: document.getElementById('areaCouncil').value,
            email: document.getElementById('email').value,
            reason: document.getElementById('reason').value,
            applicationId: 'ASA-' + Date.now().toString().slice(-8),
            applicationDate: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        };

        // Generate receipt HTML
        receiptContent.innerHTML = `
            <div class= "container">
                <div class="print-header">
                <img style="height: 100px; display: block; margin:auto;" src="logo.png" alt="ASA Logo">
                <h1>ABUJA STUDENTS ASSOCIATION</h1>
                <p><i>Knowledge for FCT students</i></p>
                </div>
                
                <div class="receipt-title">EXCOS APPLICATION RECEIPT</div>
                
                <div class="receipt-details">
                    <p><strong>Application ID:</strong> ${formData.applicationId}</p>
                    <p><strong>Application Date:</strong> ${formData.applicationDate}</p>
                    <p><strong>Applicant Name:</strong> ${formData.fullName}</p>
                    <p><strong>Gender:</strong> ${formData.gender}</p>
                    <p><strong>Category:</strong> ${formData.category}</p>
                    <p><strong>Position Applied For:</strong> ${formData.position}</p>
                    <p><strong>Registration Number:</strong> ${formData.regNo}</p>
                    <p><strong>Area Council:</strong> ${formData.areaCouncil}</p>
                    <p><strong>Email Address:</strong> ${formData.email}</p>
                    <p><strong>Reason for Application:</strong></p>
                    <p style="margin-left: 1rem; font-style: italic;">${formData.reason}</p>
                    
                    <div style="margin-top: 2rem; display: flex; justify-content: space-between;">
                        <div>
                            <div style="height: 3rem;"></div>
                            <div style="width: 200px; border-top: 1px solid #000; text-align: center; padding-top: 0.5rem;">
                            Applicant's Signature
                            </div>
                        </div>
                        <div>
                            <img src="sign.png" style="width:100px; margin-buttom:0;">
                            <div style="width: 200px; border-top: 1px solid #000; text-align: center; padding-top: 0.5rem;">
                            ASA Official Stamp
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 1.5rem; font-size: 0.9rem; text-align: center; font-style: italic;">
                    This receipt confirms your application submission. Please present it when requested.
                </div>
            </div>
        `;
        
        // Show receipt and hide form
        form.style.display = 'none';
        receiptContainer.classList.remove('hidden');
        
    });

    // Print receipt handler - GUARANTEED TO WORK
    printBtn.addEventListener('click', function() {
        // Create a clone of the receipt content for printing
        const printContent = receiptContent.cloneNode(true);
        const printWindow = window.open('', '', 'width=800,height=600');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>EXCOS Application Receipt</title>
                <style>
                    body {font-family: Arial, sans-serif; margin: 2cm; }
                    .print-header { text-align: center; margin-bottom: 1.5rem; }
                    .print-header img {display: block; margin:auto; height: 100px; }
                    .receipt-title { text-align: center; font-size: 1.5rem; margin: 1rem 0; }
                    .receipt-details { border: 0px solid #000; padding: 1.5rem; margin-top: 1rem; }
                </style>
            </head>
            <body>
                ${printContent.innerHTML}
                <script>
                    window.onload = function() { window.print(); setTimeout(function(){ window.close(); }, 100); }
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
    });

    // New application handler
    newAppBtn.addEventListener('click', function() {
        // Reset form
        form.reset();
        
        // Show form and hide receipt
        form.classList.remove('hidden');
        receiptContainer.classList.remove('visible');
        receiptContainer.style.display = 'none';
    });
});