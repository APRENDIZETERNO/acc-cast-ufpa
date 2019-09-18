package br.ufpa.lades.accs.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
public class Curso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "sigla")
    private String sigla;

    @ManyToMany
    @JoinTable(name = "curso_turmas_acc",
               joinColumns = @JoinColumn(name = "curso_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "turmas_acc_id", referencedColumnName = "id"))
    private Set<TurmaACC> turmasAccs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("cursos")
    private Usuario alunos;

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

    public Curso nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public Curso sigla(String sigla) {
        this.sigla = sigla;
        return this;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public Set<TurmaACC> getTurmasAccs() {
        return turmasAccs;
    }

    public Curso turmasAccs(Set<TurmaACC> turmaACCS) {
        this.turmasAccs = turmaACCS;
        return this;
    }

    public Curso addTurmasAcc(TurmaACC turmaACC) {
        this.turmasAccs.add(turmaACC);
        turmaACC.getCursos().add(this);
        return this;
    }

    public Curso removeTurmasAcc(TurmaACC turmaACC) {
        this.turmasAccs.remove(turmaACC);
        turmaACC.getCursos().remove(this);
        return this;
    }

    public void setTurmasAccs(Set<TurmaACC> turmaACCS) {
        this.turmasAccs = turmaACCS;
    }

    public Usuario getAlunos() {
        return alunos;
    }

    public Curso alunos(Usuario usuario) {
        this.alunos = usuario;
        return this;
    }

    public void setAlunos(Usuario usuario) {
        this.alunos = usuario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Curso)) {
            return false;
        }
        return id != null && id.equals(((Curso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Curso{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sigla='" + getSigla() + "'" +
            "}";
    }
}
