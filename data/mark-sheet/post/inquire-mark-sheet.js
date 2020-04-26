module.exports = {
    url: `/comment-papers`,
    template: {
        current:  1,
        pages:  5,
        size:  20,
        total:  100,
        'records|20':[{
            createTime:  '@datetime',
            creator:  '@cname',
            description:  '@csentence(3, 5)',
            formula:  '@word(3, 5)',
            'id|+1':  1,
            modifyTime:  '@datetime',
            name:  '@ctitle(5, 10)',
            status:  '@integer(-1,1)',
            type:  '@integer(1,3)',
        }]
    },
};
