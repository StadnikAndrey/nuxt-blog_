import { Router } from 'express'
import { articles, articlesAdmin } from '../controllers/articles/index.js'
const router = Router();

router.get('/api/articles', articles.getArticles);
router.get('/api/article', articles.getArticle);

router.get('/api/articles-admin', articlesAdmin.getArticles);
router.post('/api/insert-article', articlesAdmin.insertArticle);
router.post('/api/article-display', articlesAdmin.toggleDisplayArticle);
router.put('/api/article-delete', articlesAdmin.deleteArticle);
router.post('/api/get-article', articlesAdmin.getArticle);
router.put('/api/update-article', articlesAdmin.updateArticle);

export default router;