'use strict';

class User {
    #id;
    #name;
    #userName;
    #email;

    constructor(id, name, userName, email) {
        this.#id = id;
        this.#name = name;
        this.#userName = userName;
        this.#email = email;
    }

    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getUserName() {
        return this.#userName;
    }

    getEmail() {
        return this.#email;
    }

    getInfo() {
        return `ID: ${this.getId()}, Name: ${this.getName()}, Username: ${this.getUserName()}, Email: ${this.getEmail()}`;
    }
}

class Subscriber extends User {
    #pages;
    #groups;
    #canMonetize;

    constructor(id, name, userName, email, pages, groups, canMonetize) {
        super(id, name, userName, email); 
        this.#pages = pages;
        this.#groups = groups;
        this.#canMonetize = canMonetize;
    }

    getPages() {
        return this.#pages;
    }

    getGroups() {
        return this.#groups;
    }

    getCanMonetize() {
        return this.#canMonetize;
    }

    getInfo() {
        return `
            ID: ${this.getId()}
            Name: ${this.getName()}
            Username: ${this.getUserName()}
            Email: ${this.getEmail()}
            Pages: ${this.getPages().join(", ")}
            Groups: ${this.getGroups().join(", ")}
            Can Monetize: ${this.getCanMonetize()}
        `;
    }    
}

const subscriber = new Subscriber(
    776,
    "Michael Shuaibu",
    "Yepayepo",
    "Shuaibumikel@gmail.com",
    ["Web Development", "Data Analysis"],
    ["Clash of clans", "Call of duty canada"],
    true
);

document.querySelector('.profile-pic').addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    const modalContent = document.querySelector('.modal-content p');
    modalContent.innerHTML = subscriber
        .getInfo()
        .split("\n")
        .map(line => `<p>${line.trim()}</p>`)
        .join(""); 
    
    modal.style.display = 'flex';
});

document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.querySelector('.modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

document.querySelector('#fileUpload').addEventListener('change', (event) => {
    const fileNameElement = document.querySelector('#fileName');
    const file = event.target.files[0];

    if (file) {
        fileNameElement.textContent = file.name;  
    } else {
        fileNameElement.textContent = 'No file selected';
    }
});

document.querySelector('.post-button').addEventListener('click', () => {
    const postText = document.querySelector('.text-area').value.trim();
    const postImageFile = document.querySelector('#fileUpload').files[0];
    const displayArea = document.querySelector('.display-area');
    
    if (!postText && !postImageFile) {
        alert("Please write something or upload a photo to make a post.");
        return;
    }

    if (postText || postImageFile) {
        const postContainer = document.createElement('div');
        postContainer.classList.add('post');

        const postHeader = document.createElement('div');
        postHeader.classList.add('post-header');
        postHeader.innerHTML = `
            <img src="./assets/img/favicon.png" alt="profile picture" class="post-profile-pic">
            <div class="post-info">
                <span class="post-user-name">${subscriber.getName()}</span>
                <span class="post-date">${new Date().toLocaleString()}</span>
            </div>
        `;
        postContainer.appendChild(postHeader);

        if (postText) {
            const postTextElement = document.createElement('p');
            postTextElement.classList.add('post-text');
            postTextElement.textContent = postText;
            postContainer.appendChild(postTextElement);
        }

        if (postImageFile) {
            const postImageElement = document.createElement('img');
            postImageElement.classList.add('post-image');
            const reader = new FileReader();
            reader.onload = () => {
                postImageElement.src = reader.result;
            };
            reader.readAsDataURL(postImageFile);
            postContainer.appendChild(postImageElement);
        }

        displayArea.insertBefore(postContainer, displayArea.firstChild);

        document.querySelector('.text-area').value = '';
        document.querySelector('#fileUpload').value = '';
    }
});

const inputFile = document.getElementById('input-file');
const imagePreview = document.getElementById('image-preview');
const imageName = document.getElementById('image-name');

inputFile.addEventListener('change', function() {
    const file = inputFile.files[0]; 
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block'; 
        }
        
        reader.readAsDataURL(file);
        
        imageName.textContent = file.name;
        
        setTimeout(() => {
            imageName.textContent = '';  
        }, 3000); 
    }
});

