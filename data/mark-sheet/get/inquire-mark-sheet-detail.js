module.exports = {
    url: `/comment-papers/:id`,
    template: {
        commentPaperId:"@integer(3,10)",
        commentPaperName:'@ctitle(3,10)',
        commentPaperRuleId:"@integer(3,10)",
        ruleName: '@ctitle(3,10)',
        commentPaperType: "@integer(1,2)",
        description: '@csentence(10, 100)',
        status:  '@integer(1,2)',
    }
};
