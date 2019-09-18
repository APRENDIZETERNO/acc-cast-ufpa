package br.ufpa.lades.accs.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

import br.ufpa.lades.accs.domain.enumeration.Perfil;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "login")
    private String login;

    @Column(name = "senha")
    private String senha;

    @Column(name = "data_cadastro")
    private ZonedDateTime dataCadastro;

    @Column(name = "ultimo_login")
    private ZonedDateTime ultimoLogin;

    @Enumerated(EnumType.STRING)
    @Column(name = "perfil")
    private Perfil perfil;

    @OneToMany(mappedBy = "alunos")
    private Set<Curso> cursos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("alunos")
    private Certificado certificados;

    @ManyToOne
    @JsonIgnoreProperties("responsavels")
    private TurmaACC turmasResponsavel;

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

    public Usuario nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLogin() {
        return login;
    }

    public Usuario login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public Usuario senha(String senha) {
        this.senha = senha;
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public ZonedDateTime getDataCadastro() {
        return dataCadastro;
    }

    public Usuario dataCadastro(ZonedDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
        return this;
    }

    public void setDataCadastro(ZonedDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public ZonedDateTime getUltimoLogin() {
        return ultimoLogin;
    }

    public Usuario ultimoLogin(ZonedDateTime ultimoLogin) {
        this.ultimoLogin = ultimoLogin;
        return this;
    }

    public void setUltimoLogin(ZonedDateTime ultimoLogin) {
        this.ultimoLogin = ultimoLogin;
    }

    public Perfil getPerfil() {
        return perfil;
    }

    public Usuario perfil(Perfil perfil) {
        this.perfil = perfil;
        return this;
    }

    public void setPerfil(Perfil perfil) {
        this.perfil = perfil;
    }

    public Set<Curso> getCursos() {
        return cursos;
    }

    public Usuario cursos(Set<Curso> cursos) {
        this.cursos = cursos;
        return this;
    }

    public Usuario addCurso(Curso curso) {
        this.cursos.add(curso);
        curso.setAlunos(this);
        return this;
    }

    public Usuario removeCurso(Curso curso) {
        this.cursos.remove(curso);
        curso.setAlunos(null);
        return this;
    }

    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
    }

    public Certificado getCertificados() {
        return certificados;
    }

    public Usuario certificados(Certificado certificado) {
        this.certificados = certificado;
        return this;
    }

    public void setCertificados(Certificado certificado) {
        this.certificados = certificado;
    }

    public TurmaACC getTurmasResponsavel() {
        return turmasResponsavel;
    }

    public Usuario turmasResponsavel(TurmaACC turmaACC) {
        this.turmasResponsavel = turmaACC;
        return this;
    }

    public void setTurmasResponsavel(TurmaACC turmaACC) {
        this.turmasResponsavel = turmaACC;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", login='" + getLogin() + "'" +
            ", senha='" + getSenha() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            ", ultimoLogin='" + getUltimoLogin() + "'" +
            ", perfil='" + getPerfil() + "'" +
            "}";
    }
}
