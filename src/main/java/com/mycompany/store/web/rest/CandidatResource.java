package com.mycompany.store.web.rest;

import com.mycompany.store.domain.Candidat;
import com.mycompany.store.repository.CandidatRepository;
import com.mycompany.store.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.store.domain.Candidat}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CandidatResource {

    private final Logger log = LoggerFactory.getLogger(CandidatResource.class);

    private static final String ENTITY_NAME = "candidat";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CandidatRepository candidatRepository;

    public CandidatResource(CandidatRepository candidatRepository) {
        this.candidatRepository = candidatRepository;
    }

    /**
     * {@code POST  /candidats} : Create a new candidat.
     *
     * @param candidat the candidat to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new candidat, or with status {@code 400 (Bad Request)} if the candidat has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/candidats")
    public ResponseEntity<Candidat> createCandidat(@Valid @RequestBody Candidat candidat) throws URISyntaxException {
        log.debug("REST request to save Candidat : {}", candidat);
        if (candidat.getId() != null) {
            throw new BadRequestAlertException("A new candidat cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Candidat result = candidatRepository.save(candidat);
        return ResponseEntity.created(new URI("/api/candidats/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /candidats} : Updates an existing candidat.
     *
     * @param candidat the candidat to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated candidat,
     * or with status {@code 400 (Bad Request)} if the candidat is not valid,
     * or with status {@code 500 (Internal Server Error)} if the candidat couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/candidats")
    public ResponseEntity<Candidat> updateCandidat(@Valid @RequestBody Candidat candidat) throws URISyntaxException {
        log.debug("REST request to update Candidat : {}", candidat);
        if (candidat.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Candidat result = candidatRepository.save(candidat);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, candidat.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /candidats} : get all the candidats.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of candidats in body.
     */
    @GetMapping("/candidats")
    public List<Candidat> getAllCandidats() {
        log.debug("REST request to get all Candidats");
        return candidatRepository.findAll();
    }

    /**
     * {@code GET  /candidats/:id} : get the "id" candidat.
     *
     * @param id the id of the candidat to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the candidat, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/candidats/{id}")
    public ResponseEntity<Candidat> getCandidat(@PathVariable Long id) {
        log.debug("REST request to get Candidat : {}", id);
        Optional<Candidat> candidat = candidatRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(candidat);
    }

    /**
     * {@code DELETE  /candidats/:id} : delete the "id" candidat.
     *
     * @param id the id of the candidat to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/candidats/{id}")
    public ResponseEntity<Void> deleteCandidat(@PathVariable Long id) {
        log.debug("REST request to delete Candidat : {}", id);
        candidatRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
