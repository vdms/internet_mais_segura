---
layout: layouts/page.njk
title: Contacto
description: Entre em contacto connosco para questões sobre segurança online
---

<section>
  <div class="section-inner">
    <h1>Entre em Contacto</h1>
    <p class="section-intro">
      Tem questões sobre segurança online? Gostaria de contribuir para este projeto? 
      Use o formulário abaixo para nos contactar.
    </p>
    
    <form class="contact-form" method="POST" action="https://formspree.io/f/YOUR_FORMSPREE_ID">
      <div class="form-group">
        <label for="name" class="form-label">
          Nome <span class="required">*</span>
        </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          class="form-input" 
          required 
          minlength="2"
          placeholder="O seu nome"
        >
      </div>
      
      <div class="form-group">
        <label for="email" class="form-label">
          Email <span class="required">*</span>
        </label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          class="form-input" 
          required
          placeholder="seuemail@exemplo.pt"
        >
      </div>
      
      <div class="form-group">
        <label for="subject" class="form-label">
          Assunto <span class="required">*</span>
        </label>
        <input 
          type="text" 
          id="subject" 
          name="subject" 
          class="form-input" 
          required
          placeholder="Assunto da mensagem"
        >
      </div>
      
      <div class="form-group">
        <label for="message" class="form-label">
          Mensagem <span class="required">*</span>
        </label>
        <textarea 
          id="message" 
          name="message" 
          class="form-textarea" 
          required 
          minlength="10"
          rows="6"
          placeholder="A sua mensagem..."
        ></textarea>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Enviar Mensagem</button>
        <button type="reset" class="btn btn-ghost">Limpar</button>
      </div>
    </form>
    
    <div style="margin-top: 40px; padding: 24px; background: var(--cream); border-radius: 8px;">
      <h3>Outros Recursos</h3>
      <p>Para questões urgentes relacionadas com a segurança de crianças online, contacte:</p>
      <ul>
        <li><strong>Linha de Emergência Criança:</strong> 116 000</li>
        <li><strong>Internet Segura Portugal:</strong> <a href="https://www.internetsegura.pt" target="_blank">www.internetsegura.pt</a></li>
        <li><strong>Emergências:</strong> 112</li>
      </ul>
    </div>
  </div>
</section>
