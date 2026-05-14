let btnLight = document.querySelector(".btn-light")
let btnDark = document.querySelector(".btn-dark")
let body = document.querySelector("body")
let inputContainer = document.querySelector(".input-container")
let summary = document.querySelector(".summary")
let record = document.querySelector("#record")
let idx = 0
let records = []

let editRow = e => {
    let element = e.target 
    let id = Number(element.dataset.id)
    let parent = element.parentElement
    let grendParent = parent.parentElement
    console.log(grendParent);
    
}

let deleteRow = e => {
    let element = e.target 
    let id = Number(element.dataset.id)
    // console.log(id);

    let datas = getData()
    let newDatas = datas.filter(data => data.id !== id)
    saveData(newDatas)
    renderTabla(newDatas)
}

let deleteMutliRow = () => {
    if (!confirm("Are you sure?")) return

    let cbs = Array.from(document.querySelectorAll("#cbDelete"))
    cbs = cbs.filter(cb => cb.checked === true)
    // console.log(cbs);
    let datas = getData()

    cbs.forEach(cb => {
        console.log(cb.dataset.id);
        let idx = Number(cb.dataset.id)
        datas = datas.filter(data => data.id !== idx)
    })

    saveData(datas)
    renderTabla(datas)
    // console.log(datas);

}

let getLatestId = () => {
    let datas = getData()
    let ids = datas.map(data => data.id)
    
    idx = Math.max(...ids)
    idx++
    // console.log({ idx });
}

let addData = (dt) => {
    let datas = getData()
    datas.push(dt)
    saveData(datas)
}

let saveData = (datas) => {
    console.log({ datas });
    localStorage.setItem("record", JSON.stringify(datas))
}

let getData = () => {
    let datas = JSON.parse(localStorage.getItem("record")) || []
    return datas
}

let renderTabla = (datas) => {
    let table = document.querySelector("section table tbody")
    table.innerHTML = ""

    if (datas.length == 0){
        table.innerHTML = `
        <tr>
            <td colspan="6">
              <center>
                No Record Yet
              </center>
            </td>
          </tr>
        `
        return
    }

    datas.forEach((data, idx) => {
        let tr = document.createElement('tr')
        
        let td1 = document.createElement('td')
        td1.textContent = data.name

        let td2 = document.createElement('td')
        td2.textContent = data.NumOfTic

        let td3 = document.createElement('td')
        td3.textContent = data.totalTicket

        let td4 = document.createElement('td')
        td4.textContent = data.totalPayment

        let td5 = document.createElement('td')

        let btnRed = document.createElement("button")
        btnRed.dataset.id = data.id
        btnRed.classList.add("btn")
        btnRed.classList.add("btn-red")
        btnRed.setAttribute("id","btnDelete")
        btnRed.textContent = "Delete"


        let btnBlue = document.createElement("button")
        btnBlue.classList.add("btn")
        btnBlue.classList.add("btn-blue")
        btnBlue.setAttribute("id", "btnEdit")
        btnBlue.textContent = "Edit"
        btnBlue.dataset.id = data.id

        let checkbox = document.createElement("input")
        checkbox.classList.add("checkbox")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("id", data.id)

        td5.appendChild(btnRed)
        // td5.appendChild(btnBlue)
        td5.innerHTML += ` <input data-id="${data.id}" class="checkbox hidden" type="checkbox" name="cbDelete" id="cbDelete">`
        // td5.appendChild(checkbox)


        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        
        table.appendChild(tr)
    })

    let tr = document.createElement('tr')
    let td = document.createElement('td')
    let td2 = document.createElement('td')
    let td3 = document.createElement('td')
    let sum = datas.reduce((acc, curr) => acc + curr.totalPayment, 0)
    
    td2.textContent = `RM ${sum.toFixed(2)}`
    td.innerHTML = "<h1>Total</h1>"
    td.setAttribute("colspan", 3)

    td3.innerHTML = `<button id="btnDeleteMulti" class="btn btn-red hidden">DELETE</button>`

    tr.appendChild(td)
    tr.appendChild(td2)
    tr.appendChild(td3)
    table.appendChild(tr)


    let btns = Array.from(document.querySelectorAll("#btnDelete"))
    btns.forEach(btn => btn.addEventListener("click", e => deleteRow(e)))

    let btnEdits = Array.from(document.querySelectorAll("#btnEdit"))
    btnEdits.forEach(btnEdit => btnEdit.addEventListener("click", e => editRow(e)) )

    document.getElementById("btnDeleteMulti").addEventListener("click", e => deleteMutliRow())

    getLatestId()
}

document.addEventListener("submit", e => {
    e.preventDefault()

    let normal = document.getElementById("normal")
    let premium = document.getElementById("Premium")

    let inName = document.getElementById("inName").value.trim()
    let inMovie = document.getElementById("inMovie").value.trim()
    let inQuantity = parseInt(document.getElementById("inQuantity").value)
    let typeSeat = premium.checked ? "Premium" : "Normal"
    let priceSeat = premium.checked ? 5 : 0

    if (inName == "") {
        alert("customer name is empty")
        return
    } else if (inMovie == "") {
        alert("movie is not select")
        return
    } else if (isNaN(inQuantity)) {
        alert("ticket quantity is empty")
        return
    } else if (inQuantity <= 0) {
        alert("ticket quantity is less then 0")
        return
    } else if (premium.checked == false && normal.checked == false) {
        alert("Select seat please")
        return
    }


    let getTicketPrice = () => {
        if (inMovie == "Avengers") return 15
        else if (inMovie == "Frozen") return 12
        else if (inMovie == "Kung Fu Panda") return 10
    }

    let ticketPrice = getTicketPrice()
    // console.log({ticketPrice});

    let totalTicket = ticketPrice * inQuantity
    // console.log({totalTicket});

    let finalTotal = totalTicket + priceSeat
    // console.log({finalTotal});

    let now = new Date
    console.log(now);

    let day = now.getDate()
    let month = now.getMonth() + 1
    let year = now.getFullYear()
    // console.log({day,month,year});

    let frmatMonth = () => {
        if (month == 1) return "01"
        if (month == 2) return "02"
        if (month == 3) return "03"
        if (month == 4) return "04"
        if (month == 5) return "05"
        if (month == 6) return "06"
        if (month == 7) return "07"
        if (month == 8) return "08"
        if (month == 9) return "09"
        if (month == 10) return "10"
        if (month == 11) return "11"
        if (month == 12) return "12"
    }
    month = frmatMonth()

    let date = `${day}/${month}/${year}`

    summary.classList.remove("hidden")

    document.getElementById("outDate").textContent = date
    document.getElementById("outCustomerName").textContent = inName
    document.getElementById("outSelectedMovie").textContent = inMovie
    document.getElementById("outNumberofTickets").textContent = inQuantity
    document.getElementById("outTicketTotal").textContent = "RM " + totalTicket.toFixed(2)
    document.getElementById("outSeatCharge").textContent = "RM " + priceSeat.toFixed(2)
    document.getElementById("outFinalPayment").textContent = "RM " + finalTotal.toFixed(2)


    let data = {
        "id": idx++,
        "name": inName,
        "NumOfTic": inQuantity,
        "totalTicket": totalTicket,
        "totalPayment": finalTotal
    }

    addData(data)
    renderTabla(getData())
})
renderTabla(getData())


document.getElementById("btn-multiDelete").addEventListener("click", e => {
    let datas = getData()
    if (datas.length == 0)return

    let cbs = document.querySelectorAll("#cbDelete")
    document.getElementById("btnDeleteMulti").classList.toggle("hidden")
    cbs.forEach((cb,index) => {
        cb.checked = false
        let parent = cb.parentElement 
        cb.classList.toggle("hidden")
        let btnBlue = parent.querySelector(".btn-blue")
        let btnRed = parent.querySelector(".btn-red")
        // btnBlue.classList.toggle("hidden")
        btnRed.classList.toggle("hidden")
    })
})
btnDark.addEventListener("click", e => {
    btnDark.classList.add("hidden")
    btnLight.classList.remove("hidden")
    body.style.color = "#fff"
    body.style.backgroundColor = "#000"
    inputContainer.style.backgroundColor = "#6d6d6d"
    summary.style.backgroundColor = "#6d6d6d"

    record.style.backgroundColor = "#6d6d6d"
})
btnLight.addEventListener("click", e => {
    btnLight.classList.add("hidden")
    btnDark.classList.remove("hidden")
    body.style.color = "#000"
    body.style.backgroundColor = "#fff"
    inputContainer.style.backgroundColor = "#fff"
    summary.style.backgroundColor = "#fff"
    record.style.backgroundColor = "#fff"

})