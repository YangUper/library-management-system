const creator = 'kt'

function getBookList() {
    axios({
        url: 'https://hmajax.itheima.net/api/books',
        params: {
            creator
        }
    }).then(result => {
        console.log(result)
        console.log(result.data.data)
        bookList = result.data.data
        const htmlStr = bookList.map((item, id) => {
            return `<tr>
                    <td>${id+1}</td>
                    <td>${item.bookname}</td>
                    <td>${item.author}</td>
                    <td>${item.publisher}</td>
                    <td class='delAndEdit' data-id=${item.id}>
                        <span class="del">删除</span>
                        <span class="edit">编辑</span>
                    </td>
                </tr>`
        }).join('')
        document.querySelector('.list').innerHTML = htmlStr
    })
}

getBookList()

const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)
document.querySelector('.saveBtn').addEventListener('click', () => {
    const addForm = document.querySelector('.addBookForm')
    const bookObj = serialize(addForm, {hash: true, empty: true})
    console.log(bookObj)

    axios({
        url: 'https://hmajax.itheima.net/api/books',
        method: 'post',
        data: {
            ...bookObj,
            creator
        }
    }).then(result => {
        console.log(result)
        getBookList()
        addForm.reset()
        addModal.hide()
    })

})

document.querySelector('.list').addEventListener('click', e => {
    // console.log(e.target)
    if (e.target.classList.contains('del')){
        // console.log('点击删除元素')
        theId = e.target.parentNode.dataset.id
        
        axios({
            url: `https://hmajax.itheima.net/api/books/${theId}`,
            method: 'delete'
        }).then(() => {
            getBookList()
        })
    }
})