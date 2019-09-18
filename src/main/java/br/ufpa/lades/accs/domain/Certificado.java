package br.ufpa.lades.accs.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import br.ufpa.lades.accs.domain.enumeration.TipoCertificado;

import br.ufpa.lades.accs.domain.enumeration.StatusCertificado;

/**
 * A Certificado.
 */
@Entity
@Table(name = "certificado")
public class Certificado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulo")
    private String titulo;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_envio")
    private ZonedDateTime dataEnvio;

    @Column(name = "motivo_pendente")
    private String motivoPendente;

    @Column(name = "motivo_rejeitado")
    private String motivoRejeitado;

    @Column(name = "motivo_parcial")
    private String motivoParcial;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private TipoCertificado tipo;

    @Column(name = "ch_pedida")
    private Integer chPedida;

    @Column(name = "ch_concedida")
    private Integer chConcedida;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado")
    private StatusCertificado estado;

    @Column(name = "caminho_arquivo")
    private String caminhoArquivo;

    @OneToMany(mappedBy = "certificados")
    private Set<Usuario> alunos = new HashSet<>();

    @OneToMany(mappedBy = "certificados")
    private Set<TurmaACC> turmas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public Certificado titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public Certificado descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public ZonedDateTime getDataEnvio() {
        return dataEnvio;
    }

    public Certificado dataEnvio(ZonedDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
        return this;
    }

    public void setDataEnvio(ZonedDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public String getMotivoPendente() {
        return motivoPendente;
    }

    public Certificado motivoPendente(String motivoPendente) {
        this.motivoPendente = motivoPendente;
        return this;
    }

    public void setMotivoPendente(String motivoPendente) {
        this.motivoPendente = motivoPendente;
    }

    public String getMotivoRejeitado() {
        return motivoRejeitado;
    }

    public Certificado motivoRejeitado(String motivoRejeitado) {
        this.motivoRejeitado = motivoRejeitado;
        return this;
    }

    public void setMotivoRejeitado(String motivoRejeitado) {
        this.motivoRejeitado = motivoRejeitado;
    }

    public String getMotivoParcial() {
        return motivoParcial;
    }

    public Certificado motivoParcial(String motivoParcial) {
        this.motivoParcial = motivoParcial;
        return this;
    }

    public void setMotivoParcial(String motivoParcial) {
        this.motivoParcial = motivoParcial;
    }

    public TipoCertificado getTipo() {
        return tipo;
    }

    public Certificado tipo(TipoCertificado tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(TipoCertificado tipo) {
        this.tipo = tipo;
    }

    public Integer getChPedida() {
        return chPedida;
    }

    public Certificado chPedida(Integer chPedida) {
        this.chPedida = chPedida;
        return this;
    }

    public void setChPedida(Integer chPedida) {
        this.chPedida = chPedida;
    }

    public Integer getChConcedida() {
        return chConcedida;
    }

    public Certificado chConcedida(Integer chConcedida) {
        this.chConcedida = chConcedida;
        return this;
    }

    public void setChConcedida(Integer chConcedida) {
        this.chConcedida = chConcedida;
    }

    public StatusCertificado getEstado() {
        return estado;
    }

    public Certificado estado(StatusCertificado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(StatusCertificado estado) {
        this.estado = estado;
    }

    public String getCaminhoArquivo() {
        return caminhoArquivo;
    }

    public Certificado caminhoArquivo(String caminhoArquivo) {
        this.caminhoArquivo = caminhoArquivo;
        return this;
    }

    public void setCaminhoArquivo(String caminhoArquivo) {
        this.caminhoArquivo = caminhoArquivo;
    }

    public Set<Usuario> getAlunos() {
        return alunos;
    }

    public Certificado alunos(Set<Usuario> usuarios) {
        this.alunos = usuarios;
        return this;
    }

    public Certificado addAluno(Usuario usuario) {
        this.alunos.add(usuario);
        usuario.setCertificados(this);
        return this;
    }

    public Certificado removeAluno(Usuario usuario) {
        this.alunos.remove(usuario);
        usuario.setCertificados(null);
        return this;
    }

    public void setAlunos(Set<Usuario> usuarios) {
        this.alunos = usuarios;
    }

    public Set<TurmaACC> getTurmas() {
        return turmas;
    }

    public Certificado turmas(Set<TurmaACC> turmaACCS) {
        this.turmas = turmaACCS;
        return this;
    }

    public Certificado addTurma(TurmaACC turmaACC) {
        this.turmas.add(turmaACC);
        turmaACC.setCertificados(this);
        return this;
    }

    public Certificado removeTurma(TurmaACC turmaACC) {
        this.turmas.remove(turmaACC);
        turmaACC.setCertificados(null);
        return this;
    }

    public void setTurmas(Set<TurmaACC> turmaACCS) {
        this.turmas = turmaACCS;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Certificado)) {
            return false;
        }
        return id != null && id.equals(((Certificado) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Certificado{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", dataEnvio='" + getDataEnvio() + "'" +
            ", motivoPendente='" + getMotivoPendente() + "'" +
            ", motivoRejeitado='" + getMotivoRejeitado() + "'" +
            ", motivoParcial='" + getMotivoParcial() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", chPedida=" + getChPedida() +
            ", chConcedida=" + getChConcedida() +
            ", estado='" + getEstado() + "'" +
            ", caminhoArquivo='" + getCaminhoArquivo() + "'" +
            "}";
    }
}
