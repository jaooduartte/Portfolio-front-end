import { Component } from '@angular/core';
import { ModalExperienciaComponent } from "../modal-experiencia/modal-experiencia.component";
import { ModalProjectsComponent } from '../modal-projects/modal-projects.component';

@Component({
  selector: 'app-header',
  imports: [ModalExperienciaComponent, ModalProjectsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  showExperienciaModal: boolean = false;
  showProjectsModal: boolean = false;

  openExperienciaModal() {
    console.log('Abrindo modal de experiência profissional');
    this.showExperienciaModal = true;
  }
  openProjectsModal() {
    console.log('Abrindo modal de projetos');
    this.showProjectsModal = true;
  }

  downloadCurriculo() {
    try {
      console.log('Download iniciado');
      const fileUrl = '/assets/Curriculo-2026.1.pdf';
      console.log('Caminho do arquivo:', fileUrl);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'Curriculo-2026.1.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao tentar baixar o currículo:', error);
    }
  }
}