module.exports = {
    url: `/comment-papers/comment-template/:id`,
    template: {
        current:  1,
        pages:  5,
        size:  20,
        total:  100,
        'records|20':[{
            createTime:  '@datetime',
            modifyTime:  '@datetime',
            creator:  '@cname',
            description:  '@csentence(3, 5)',
            'id|+1':  1,
            name:  '@ctitle(5, 10)',
            status:  '@integer(1,2)',
        }]
    }
}
