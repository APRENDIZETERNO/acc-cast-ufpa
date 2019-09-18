package br.ufpa.lades.accs.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A TurmaACC.
 */
@Entity
@Table(name = "turma_acc")
public class TurmaACC implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "pontuacao")
    private Integer pontuacao;

    @Column(name = "inicio")
    private LocalDate inicio;

    @Column(name = "prazo_envio")
    private LocalDate prazoEnvio;

    @OneToMany(mappedBy = "turmasResponsavel")
    private Set<Usuario> responsavels = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("turmas")
    private Certificado certificados;

    @ManyToMany(mappedBy = "turmasAccs")
    @JsonIgnore
    private Set<Curso> cursos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public TurmaACC nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getPontuacao() {
        return pontuacao;
    }

    public TurmaACC pontuacao(Integer pontuacao) {
        this.pontuacao = pontuacao;
        return this;
    }

    public void setPontuacao(Integer pontuacao) {
        this.pontuacao = pontuacao;
    }

    public LocalDate getInicio() {
        return inicio;
    }

    public TurmaACC inicio(LocalDate inicio) {
        this.inicio = inicio;
        return this;
    }

    public void setInicio(LocalDate inicio) {
        this.inicio = inicio;
    }

    public LocalDate getPrazoEnvio() {
        return prazoEnvio;
    }

    public TurmaACC prazoEnvio(LocalDate prazoEnvio) {
        this.prazoEnvio = prazoEnvio;
        return this;
    }

    public void setPrazoEnvio(LocalDate prazoEnvio) {
        this.prazoEnvio = prazoEnvio;
    }

    public Set<Usuario> getResponsavels() {
        return responsavels;
    }

    public TurmaACC responsavels(Set<Usuario> usuarios) {
        this.responsavels = usuarios;
        return this;
    }

    public TurmaACC addResponsavel(Usuario usuario) {
        this.responsavels.add(usuario);
        usuario.setTurmasResponsavel(this);
        return this;
    }

    public TurmaACC removeResponsavel(Usuario usuario) {
        this.responsavels.remove(usuario);
        usuario.setTurmasResponsavel(null);
        return this;
    }

    public void setResponsavels(Set<Usuario> usuarios) {
        this.responsavels = usuarios;
    }

    public Certificado getCertificados() {
        return certificados;
    }

    public TurmaACC certificados(Certificado certificado) {
        this.certificados = certificado;
        return this;
    }

    public void setCertificados(Certificado certificado) {
        this.certificados = certificado;
    }

    public Set<Curso> getCursos() {
        return cursos;
    }

    public TurmaACC cursos(Set<Curso> cursos) {
        this.cursos = cursos;
        return this;
    }

    public TurmaACC addCursos(Curso curso) {
        this.cursos.add(curso);
        curso.getTurmasAccs().add(this);
        return this;
    }

    public TurmaACC removeCursos(Curso curso) {
        this.cursos.remove(curso);
        curso.getTurmasAccs().remove(this);
        return this;
    }

    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TurmaACC)) {
            return false;
        }
        return id != null && id.equals(((TurmaACC) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TurmaACC{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", pontuacao=" + getPontuacao() +
            ", inicio='" + getInicio() + "'" +
            ", prazoEnvio='" + getPrazoEnvio() + "'" +
            "}";
    }
}
