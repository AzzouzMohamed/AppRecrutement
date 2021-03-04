package com.mycompany.store.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.store.web.rest.TestUtil;

public class ExaminTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Examin.class);
        Examin examin1 = new Examin();
        examin1.setId(1L);
        Examin examin2 = new Examin();
        examin2.setId(examin1.getId());
        assertThat(examin1).isEqualTo(examin2);
        examin2.setId(2L);
        assertThat(examin1).isNotEqualTo(examin2);
        examin1.setId(null);
        assertThat(examin1).isNotEqualTo(examin2);
    }
}
