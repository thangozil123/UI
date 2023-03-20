const saveButton = document.querySelector('#btnSave');
const updateButton = document.querySelector('#btnUpdate');
const deleteButton = document.querySelector('#student');
const nameInput = document.querySelector('#name');
const genderInput= document.querySelector('#gender');
const ageInput = document.querySelector('#age');
const addressInput = document.querySelector('#address');
const emailInput= document.querySelector('#email');  
const studentList=document.querySelector('#student-list');

const nameValue=document.getElementById("name");
const genderValue=document.getElementById("gender");
const ageValue=document.getElementById("age");
const addressValue=document.getElementById("address");
const emailValue=document.getElementById("email");


//thêm sinh viên
function addStudent(name, gender,age,address,email){
    const body = {
        name: name,
        gender: gender,
        age: age,
        address: address,
        email:email
    };
    
    fetch('https://localhost:7137/api/Students',{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })  
    .then(data => data.json())
    .then(() => location.reload())
}

// hiển thị danh sách sinh viên dạng bảng
        fetch("https://localhost:7137/api/Students")
        .then(response => response.json())
        .then(json =>{
        let li=``;
        json.forEach(Students => {
                                    li += `
                                        <tr>                                
                                        <td id="name-student">${Students.name}</td>
                                        <td id="gender-student">${Students.gender}</td>
                                        <td id="age-student">${Students.age}</td>
                                        <td id="address-student">${Students.address}</td>
                                        <td id="email-student">${Students.email}</td>
                                        <td data-id=${Students.id}>
                                            <a href = "#" class="ms-btn3" id="edit">Edit</a>
                                            <a href = "#" class="ms-btn4" id="delete">Delete</a>
                                        </tr>                                        
                                        `;       
                                 });
        document.getElementById("student").innerHTML=li;
        });
    
        


//nút lưu
saveButton.addEventListener('click', function(){
    addStudent(nameInput.value, genderInput.value,ageInput.value,addressInput.value,emailInput.value)
});


deleteButton.addEventListener('click', (e) =>{
    e.preventDefault();
    let delButton = e.target.id == 'delete';
    let ediButton = e.target.id == 'edit';


    let id = e.target.parentElement.dataset.id;

    if(delButton) {
        fetch(`https://localhost:7137/api/Students/${id}`, {
            method: 'DELETE',
        })
        .then(data => data.json())
        .then(() => location.reload())
    }

    if(ediButton){
        const parent = e.target.parentElement;
        let nameStudent = parent.parentElement.querySelector("#name-student").textContent;
        let genderStudent = parent.parentElement.querySelector("#gender-student").textContent;
        let ageStudent = parent.parentElement.querySelector("#age-student").textContent;
        let addressStudent = parent.parentElement.querySelector("#address-student").textContent;
        let emailStudent = parent.parentElement.querySelector("#email-student").textContent;
        
        nameValue.value=nameStudent;
        genderValue.value = genderStudent;
        ageValue.value = ageStudent;
        addressValue.value = addressStudent;
        emailValue.value = emailStudent;
    }  

    updateButton.addEventListener('click', () =>{
        fetch(`https://localhost:7137/api/Students/${id}`,{
            method: 'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body:JSON.stringify({
                name:nameValue.value,
                gender:genderValue.value,
                age:ageValue.value,
                address:addressValue.value,
                email:emailValue.value
            })
        })
        .then(data => data.json())
        .then(() => location.reload())
    })
});



