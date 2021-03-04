package com.mycompany.store.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Examin.
 */
@Entity
@Table(name = "examin")
public class Examin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "domaine_de_competence", nullable = false)
    private String domaineDeCompetence;

    @OneToMany(mappedBy = "examin")
    private Set<Question> questions = new HashSet<>();

    @OneToMany(mappedBy = "examin")
    private Set<Resultat> resultats = new HashSet<>();

    @ManyToMany(mappedBy = "examins")
    @JsonIgnore
    private Set<Poste> postes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDomaineDeCompetence() {
        return domaineDeCompetence;
    }

    public Examin domaineDeCompetence(String domaineDeCompetence) {
        this.domaineDeCompetence = domaineDeCompetence;
        return this;
    }

    public void setDomaineDeCompetence(String domaineDeCompetence) {
        this.domaineDeCompetence = domaineDeCompetence;
    }

    public Set<Question> getQuestions() {
        return questions;
    }

    public Examin questions(Set<Question> questions) {
        this.questions = questions;
        return this;
    }

    public Examin addQuestion(Question question) {
        this.questions.add(question);
        question.setExamin(this);
        return this;
    }

    public Examin removeQuestion(Question question) {
        this.questions.remove(question);
        question.setExamin(null);
        return this;
    }

    public void setQuestions(Set<Question> questions) {
        this.questions = questions;
    }

    public Set<Resultat> getResultats() {
        return resultats;
    }

    public Examin resultats(Set<Resultat> resultats) {
        this.resultats = resultats;
        return this;
    }

    public Examin addResultat(Resultat resultat) {
        this.resultats.add(resultat);
        resultat.setExamin(this);
        return this;
    }

    public Examin removeResultat(Resultat resultat) {
        this.resultats.remove(resultat);
        resultat.setExamin(null);
        return this;
    }

    public void setResultats(Set<Resultat> resultats) {
        this.resultats = resultats;
    }

    public Set<Poste> getPostes() {
        return postes;
    }

    public Examin postes(Set<Poste> postes) {
        this.postes = postes;
        return this;
    }

    public Examin addPoste(Poste poste) {
        this.postes.add(poste);
        poste.getExamins().add(this);
        return this;
    }

    public Examin removePoste(Poste poste) {
        this.postes.remove(poste);
        poste.getExamins().remove(this);
        return this;
    }

    public void setPostes(Set<Poste> postes) {
        this.postes = postes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Examin)) {
            return false;
        }
        return id != null && id.equals(((Examin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Examin{" +
            "id=" + getId() +
            ", domaineDeCompetence='" + getDomaineDeCompetence() + "'" +
            "}";
    }
}
