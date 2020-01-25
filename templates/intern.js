function generateInternHTML(data) {
    return `<div class="card" style="width: 30%;">
    <div class="card-header"><h1>${data.name}</h1></div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><h2>Intern</h2></li>
            <li class="list-group-item">ID: ${data.id}</li>
            <li class="list-group-item">Email: ${data.email}</li>
            <li class="list-group-item">School: ${data.school}</li>
        </ul>
    </div>`
}

module.exports = generateInternHTML