import { Component } from '@angular/core';
import { ModalExperienciaComponent } from "../modal-experiencia/modal-experiencia.component";

@Component({
  selector: 'app-header',
  imports: [ModalExperienciaComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'], // Corrigido o erro de "styleUrl"
})
export class HeaderComponent {
  showExperienciaModal: boolean = false;

  openExperienciaModal() {
    console.log('Abrindo modal de experiência profissional'); // Log para verificar o clique
    this.showExperienciaModal = true;
  }

  downloadCurriculo() {
    try {
      console.log('Download iniciado');
      const fileUrl = '/assets/Curriculo-2024.pdf';
      console.log('Caminho do arquivo:', fileUrl);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'Curriculo-2024.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao tentar baixar o currículo:', error);
    }
  }
}