const creator = 'kt'
// 渲染
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
                    <td>${id + 1}</td>
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
// 增加
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)
document.querySelector('.saveBtn').addEventListener('click', () => {
    const addForm = document.querySelector('.addBookForm')
    const bookObj = serialize(addForm, { hash: true, empty: true })
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
// 删除
document.querySelector('.list').addEventListener('click', e => {
    // console.log(e.target)
    if (e.target.classList.contains('del')) {
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
// 编辑
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)
document.querySelector('.list').addEventListener('click', e => {
    if (e.target.classList.contains('edit')) {
        theId = e.target.parentNode.dataset.id
        axios({
            url: `https://hmajax.itheima.net/api/books/${theId}`
        }).then(result => {
            // console.log(result)
            const bookObj = result.data.data
            // document.querySelector('.editBookForm .bookname').value = bookObj.bookname
            // document.querySelector('.editBookForm .author').value = bookObj.author
            // document.querySelector('.editBookForm .publisher').value = bookObj.publisher
            const keys = Object.keys(bookObj)
            // console.log(keys)   ['id', 'bookname', 'author', 'publisher']
            keys.forEach(key => {
                const input = document.querySelector(`.editBookForm .${key}`);
                if (input) input.value = bookObj[key];
            });
        })
        editModal.show()
    }
})
document.querySelector('.editBtn').addEventListener('click', () => {
    const editForm = document.querySelector('.editBookForm')
    const { id, bookname, author, publisher } = serialize(editForm, { hash: true, empty: true })
    // console.log(bookObj)
    axios({
        url: `https://hmajax.itheima.net/api/books/${id}`,
        method: 'put',
        data: {
            bookname,
            author,
            publisher,
            creator
        }
    }).then(() => {
        getBookList()
        editModal.hide()
    })
})