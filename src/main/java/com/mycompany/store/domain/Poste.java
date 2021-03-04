package com.mycompany.store.domain;


import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Poste.
 */
@Entity
@Table(name = "poste")
public class Poste implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nom_du_poste", nullable = false)
    private String nomDuPoste;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @OneToMany(mappedBy = "poste")
    private Set<Candidat> candidats = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "poste_examin",
               joinColumns = @JoinColumn(name = "poste_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "examin_id", referencedColumnName = "id"))
    private Set<Examin> examins = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomDuPoste() {
        return nomDuPoste;
    }

    public Poste nomDuPoste(String nomDuPoste) {
        this.nomDuPoste = nomDuPoste;
        return this;
    }

    public void setNomDuPoste(String nomDuPoste) {
        this.nomDuPoste = nomDuPoste;
    }

    public String getDescription() {
        return description;
    }

    public Poste description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Candidat> getCandidats() {
        return candidats;
    }

    public Poste candidats(Set<Candidat> candidats) {
        this.candidats = candidats;
        return this;
    }

    public Poste addCandidat(Candidat candidat) {
        this.candidats.add(candidat);
        candidat.setPoste(this);
        return this;
    }

    public Poste removeCandidat(Candidat candidat) {
        this.candidats.remove(candidat);
        candidat.setPoste(null);
        return this;
    }

    public void setCandidats(Set<Candidat> candidats) {
        this.candidats = candidats;
    }

    public Set<Examin> getExamins() {
        return examins;
    }

    public Poste examins(Set<Examin> examins) {
        this.examins = examins;
        return this;
    }

    public Poste addExamin(Examin examin) {
        this.examins.add(examin);
        examin.getPostes().add(this);
        return this;
    }

    public Poste removeExamin(Examin examin) {
        this.examins.remove(examin);
        examin.getPostes().remove(this);
        return this;
    }

    public void setExamins(Set<Examin> examins) {
        this.examins = examins;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Poste)) {
            return false;
        }
        return id != null && id.equals(((Poste) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Poste{" +
            "id=" + getId() +
            ", nomDuPoste='" + getNomDuPoste() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
